// src/mocks/handlers/reports.js
import { http, HttpResponse, delay } from 'msw'
import { db } from '../data/db'

export const reportHandlers = [
  // GET /api/reports
  http.get('/api/reports', async () => {
    await delay(400)

    const allTasks = db.tasks
    const now = new Date('2026-03-06')

    // 狀態分佈
    const statusDistribution = {
      todo: allTasks.filter((t) => t.status === 'todo').length,
      'in-progress': allTasks.filter((t) => t.status === 'in-progress').length,
      done: allTasks.filter((t) => t.status === 'done').length,
    }

    // 優先級分佈
    const priorityDistribution = {
      low: allTasks.filter((t) => t.priority === 'low').length,
      medium: allTasks.filter((t) => t.priority === 'medium').length,
      high: allTasks.filter((t) => t.priority === 'high').length,
      urgent: allTasks.filter((t) => t.priority === 'urgent').length,
    }

    // 本週完成數（最近 7 天逐日統計）
    const weeklyCompletion = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now)
      date.setDate(date.getDate() - (6 - i))
      const dateStr = date.toISOString().split('T')[0]

      const count = allTasks.filter((t) => {
        if (t.status !== 'done') return false
        const updated = t.updatedAt.split('T')[0]
        return updated === dateStr
      }).length

      return { date: dateStr, count }
    })

    // 各專案任務統計
    const projectStats = db.projects.map((p) => {
      const projectTasks = allTasks.filter((t) => t.projectId === p.id)
      return {
        projectId: p.id,
        projectName: p.name,
        total: projectTasks.length,
        todo: projectTasks.filter((t) => t.status === 'todo').length,
        inProgress: projectTasks.filter((t) => t.status === 'in-progress').length,
        done: projectTasks.filter((t) => t.status === 'done').length,
      }
    })

    const completedThisWeek = weeklyCompletion.reduce(
      (sum, d) => sum + d.count,
      0
    )
    const completionRate =
      allTasks.length > 0
        ? Math.round(
            (allTasks.filter((t) => t.status === 'done').length /
              allTasks.length) *
              100
          ) / 100
        : 0

    return HttpResponse.json({
      summary: {
        totalProjects: db.projects.length,
        totalTasks: allTasks.length,
        completedThisWeek,
        completionRate,
      },
      statusDistribution,
      priorityDistribution,
      weeklyCompletion,
      projectStats,
    })
  }),
]
