// src/mocks/data/tasks.js
import { faker } from '@faker-js/faker/locale/zh_TW'

const TASK_STATUSES = ['todo', 'in-progress', 'done']
const TASK_PRIORITIES = ['low', 'medium', 'high', 'urgent']
const TAG_POOL = ['UI', 'API', 'Bug', 'Feature', 'Design', 'Refactor', 'Testing', 'Docs', 'DevOps', 'Performance']

const TASK_TITLES = [
  '設計登入頁 UI',
  '實作使用者認證 API',
  '修復列表排序 Bug',
  '撰寫單元測試',
  '建立資料庫 Schema',
  '優化首頁載入速度',
  '設計 Dashboard 版面',
  '實作通知推播功能',
  '整合第三方支付',
  '建立 CI/CD Pipeline',
  '重構 API 路由結構',
  '新增匯出 CSV 功能',
  '設計行動版 RWD',
  '實作搜尋功能',
  '修復記憶體洩漏問題',
  '建立 Storybook 文件',
  '設定 eslint 規則',
  '實作拖曳排序',
  '新增多語系支援',
  '效能監控整合',
]

/**
 * 產生 checklist 項目
 */
function generateChecklist() {
  const count = faker.number.int({ min: 0, max: 5 })
  if (count === 0) return []

  return Array.from({ length: count }, (_, i) => ({
    id: `cl-${faker.string.nanoid(6)}`,
    text: faker.hacker.phrase(),
    done: faker.datatype.boolean(),
  }))
}

/**
 * 產生任務種子資料
 * @param {Array} projects - 專案列表
 * @param {Array} users - 使用者列表
 * @param {number} perProject - 每個專案的任務數
 */
export function generateTasks(projects, users, perProject = 8) {
  const tasks = []
  let titleIndex = 0

  projects.forEach((project) => {
    const count = faker.number.int({
      min: perProject - 2,
      max: perProject + 4,
    })

    for (let i = 0; i < count; i++) {
      const assignee = faker.helpers.arrayElement(project.members)
      const creator = faker.helpers.arrayElement(project.members)
      const status = faker.helpers.arrayElement(TASK_STATUSES)
      const priority = faker.helpers.arrayElement(TASK_PRIORITIES)

      const createdAt = faker.date.between({
        from: project.createdAt,
        to: '2026-03-01',
      })

      // 部分任務已逾期、部分即將到期
      let dueDate
      const dueSeed = faker.number.int({ min: 1, max: 10 })
      if (dueSeed <= 2) {
        // 已逾期
        dueDate = faker.date.between({
          from: createdAt,
          to: '2026-03-05',
        })
      } else if (dueSeed <= 5) {
        // 即將到期（未來 7 天內）
        dueDate = faker.date.between({
          from: '2026-03-06',
          to: '2026-03-13',
        })
      } else {
        // 較遠的未來
        dueDate = faker.date.between({
          from: '2026-03-14',
          to: '2026-06-30',
        })
      }

      const title =
        titleIndex < TASK_TITLES.length
          ? TASK_TITLES[titleIndex]
          : faker.hacker.phrase()
      titleIndex++

      tasks.push({
        id: `task-${faker.string.nanoid(8)}`,
        title,
        description: faker.lorem.paragraphs({ min: 1, max: 3 }),
        status,
        priority,
        assignee: { id: assignee.id, name: assignee.name, avatar: assignee.avatar },
        dueDate: dueDate.toISOString().split('T')[0],
        tags: faker.helpers.arrayElements(
          TAG_POOL,
          faker.number.int({ min: 1, max: 3 })
        ),
        checklist: generateChecklist(),
        attachments: [],
        projectId: project.id,
        createdBy: { id: creator.id, name: creator.name, avatar: creator.avatar },
        createdAt: createdAt.toISOString(),
        updatedAt: faker.date
          .between({ from: createdAt, to: '2026-03-06' })
          .toISOString(),
      })
    }
  })

  return tasks
}
