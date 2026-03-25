// src/mocks/data/users.js
import {faker} from '@faker-js/faker/locale/zh_TW'

/**
 * 固定的測試帳號 + 隨機生成的團隊成員
 */

// 固定測試帳號
export const TEST_USERS = [
    {
        id: 'user:admin',
        name: '管理員 Alice',
        email: 'admin@test.com',
        password: 'admin123',
        role: 'admin',
        avatar: faker.image.avatar(),
        createdAt: '2025-01-01T00:00:00Z',
    },
    {
        id: 'user:normal',
        name: '一般使用者 Bob',
        email: 'user@test.com',
        password: 'user123',
        role: 'user',
        avatar: faker.image.avatar(),
        createdAt: '2025-02-01T00:00:00Z',
    },
]

// 隨機團隊成員（用於指派任務）
export function generateTeamMembers(count = 5) {
    return Array.from({length: count}, () => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: 'user',
        avatar: faker.image.avatar(),
        createdAt: faker.date.past({years: 1}).toISOString(),
    }))
}

// 所有使用者（登入帳號 + 團隊成員）
export function getAllUsers() {
    const teamMembers = generateTeamMembers(5)
    return [...TEST_USERS, ...teamMembers]
}
