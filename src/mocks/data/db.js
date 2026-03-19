// src/mocks/data/db.js
// 集中管理 in-memory 假資料庫，各 handler 共用同一份資料

import {getAllUsers} from './users'
import {generateProjects} from './projects'
import {generateTasks} from './tasks'
import {generateNotifications} from './notifications'

// 初始化所有種子資料
const users = getAllUsers()
const projects = generateProjects(users, 40)
const tasks = generateTasks(projects, users, 80)
const notifications = generateNotifications(users, tasks, projects, 12)

const settings = {
    profile: {
        name: users[0].name,
        email: users[0].email,
        avatar: users[0].avatar,
    },
    preferences: {
        theme: 'light',
        notifications: true,
        language: 'zh-TW',
    },
}

/**
 * In-memory database
 * handler 可直接 import 此物件來讀寫資料
 * 因為是 module scope，整個 app 生命週期共享同一份
 */
export const db = {
    users,
    projects,
    tasks,
    notifications,
    settings,
}
