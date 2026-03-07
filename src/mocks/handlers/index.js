// src/mocks/handlers/index.js
// 匯出所有 MSW handlers

import { authHandlers } from './auth'
import { dashboardHandlers } from './dashboard'
import { projectHandlers } from './projects'
import { taskHandlers } from './tasks'
import { notificationHandlers } from './notifications'
import { reportHandlers } from './reports'
import { settingsHandlers } from './settings'

export const handlers = [
  ...authHandlers,
  ...dashboardHandlers,
  ...projectHandlers,
  ...taskHandlers,
  ...notificationHandlers,
  ...reportHandlers,
  ...settingsHandlers,
]
