// src/mocks/data/projects.js
import { faker } from '@faker-js/faker/locale/zh_TW'

const PROJECT_STATUSES = ['active', 'archived', 'completed']

const PROJECT_NAMES = [
  '電商後台改版',
  '行動 App 2.0',
  '客戶管理系統',
  '數據分析平台',
  '內部知識庫',
  'API Gateway 重構',
  '自動化測試建置',
  '設計系統建立',
]

/**
 * 產生專案種子資料
 * @param {Array} users - 所有使用者，用於隨機指派 owner / members
 * @param {number} count - 產生數量
 */
export function generateProjects(users, count = 6) {
  return Array.from({ length: Math.min(count, PROJECT_NAMES.length) }, (_, i) => {
    const owner = users[i % users.length]
    const memberCount = faker.number.int({ min: 2, max: 5 })
    const members = faker.helpers
      .arrayElements(users, memberCount)
      .map((u) => ({ id: u.id, name: u.name, avatar: u.avatar }))

    // 確保 owner 在 members 中
    if (!members.find((m) => m.id === owner.id)) {
      members.unshift({ id: owner.id, name: owner.name, avatar: owner.avatar })
    }

    const createdAt = faker.date.between({
      from: '2025-06-01',
      to: '2026-01-31',
    })

    return {
      id: `proj-${i + 1}`,
      name: PROJECT_NAMES[i],
      description: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement(PROJECT_STATUSES),
      owner: { id: owner.id, name: owner.name, avatar: owner.avatar },
      members,
      createdAt: createdAt.toISOString(),
      updatedAt: faker.date
        .between({ from: createdAt, to: '2026-03-06' })
        .toISOString(),
    }
  })
}
