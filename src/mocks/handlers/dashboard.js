// src/mocks/handlers/dashboard.js
import { http, HttpResponse, delay } from 'msw'
import { db } from '../data/db'

export const dashboardHandlers = [
  // GET /api/dashboard
  http.get('/api/dashboard', async () => {
    await delay(300)

    const now = new Date('2026-03-06')
    const allTasks = db.tasks

    // 統計摘要
    const totalTasks = allTasks.length
    const todayTodo = allTasks.filter((t) => t.status === 'todo').length
    const overdueTasks = allTasks.filter(
      (t) => t.status !== 'done' && new Date(t.dueDate) < now
    )
    const upcomingTasks = allTasks.filter((t) => {
      const due = new Date(t.dueDate)
      return t.status !== 'done' && due >= now && due <= new Date('2026-03-13')
    })

    // 最近活動（從任務的 updatedAt 產生）
    const recentActivities = allTasks
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 8)
      .map((t, i) => ({
        id: `act-${i + 1}`,
        type: ['task_created', 'task_updated', 'status_changed', 'comment_added'][i % 4],
        message: `${t.createdBy.name} 更新了「${t.title}」`,
        timestamp: t.updatedAt,
        user: t.createdBy,
      }))

    return HttpResponse.json({
      summary: {
        totalTasks,
        todayTodo,
        overdue: overdueTasks.length,
        upcoming: upcomingTasks.length,
      },
      overdueTasks: overdueTasks.slice(0, 5).map((t) => ({
        id: t.id,
        title: t.title,
        dueDate: t.dueDate,
        project: db.projects.find((p) => p.id === t.projectId)?.name || '',
        projectId: t.projectId,
        priority: t.priority,
      })),
      upcomingTasks: upcomingTasks.slice(0, 5).map((t) => ({
        id: t.id,
        title: t.title,
        dueDate: t.dueDate,
        project: db.projects.find((p) => p.id === t.projectId)?.name || '',
        projectId: t.projectId,
        priority: t.priority,
      })),
      recentActivities,
    })
  }),
]
