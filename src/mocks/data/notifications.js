// src/mocks/data/notifications.js
import { faker } from '@faker-js/faker/locale/zh_TW'

const NOTIFICATION_TYPES = ['task_assigned', 'task_updated', 'comment', 'system']

const MESSAGE_TEMPLATES = {
  task_assigned: (user, task) => ({
    title: '你被指派了新任務',
    message: `${user} 將「${task}」指派給你`,
  }),
  task_updated: (user, task) => ({
    title: '任務狀態已更新',
    message: `${user} 更新了「${task}」的狀態`,
  }),
  comment: (user, task) => ({
    title: '新留言',
    message: `${user} 在「${task}」留了新留言`,
  }),
  system: () => ({
    title: '系統通知',
    message: faker.helpers.arrayElement([
      '系統將於今晚 23:00 進行維護',
      '新版本已發佈，請重新整理頁面',
      '你的密碼已超過 90 天未更新',
      '歡迎使用 TaskFlow Admin！',
    ]),
  }),
}

/**
 * 產生通知種子資料
 * @param {Array} users - 使用者列表
 * @param {Array} tasks - 任務列表
 * @param {Array} projects - 專案列表
 * @param {number} count - 通知數量
 */
export function generateNotifications(users, tasks, projects, count = 12) {
  return Array.from({ length: count }, (_, i) => {
    const type = faker.helpers.arrayElement(NOTIFICATION_TYPES)
    const user = faker.helpers.arrayElement(users)
    const task = tasks.length > 0 ? faker.helpers.arrayElement(tasks) : null
    const project = projects.length > 0 ? faker.helpers.arrayElement(projects) : null

    let content
    if (type === 'system') {
      content = MESSAGE_TEMPLATES.system()
    } else {
      content = MESSAGE_TEMPLATES[type](
        user.name,
        task ? task.title : '某任務'
      )
    }

    // 決定點擊後跳轉的路徑
    let link = '/dashboard'
    if (task && project) {
      link = `/projects/${task.projectId}`
    } else if (project) {
      link = `/projects/${project.id}`
    }

    return {
      id: `notif-${i + 1}`,
      type,
      title: content.title,
      message: content.message,
      read: faker.datatype.boolean({ probability: 0.4 }),
      link,
      createdAt: faker.date
        .recent({ days: 7 })
        .toISOString(),
    }
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}
