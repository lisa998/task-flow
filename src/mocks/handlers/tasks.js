// src/mocks/handlers/tasks.js
import { http, HttpResponse, delay } from 'msw'
import { faker } from '@faker-js/faker/locale/zh_TW'
import { db } from '../data/db'

export const taskHandlers = [
  // GET /api/tasks?projectId=xxx&status=xxx&priority=xxx&search=xxx&sort=xxx
  http.get('/api/tasks', async ({ request }) => {
    await delay(300)

    const url = new URL(request.url)
    const projectId = url.searchParams.get('projectId')
    const status = url.searchParams.get('status')
    const priority = url.searchParams.get('priority')
    const assignee = url.searchParams.get('assignee')
    const search = url.searchParams.get('search')
    const sort = url.searchParams.get('sort')

    let tasks = [...db.tasks]

    // 依專案篩選
    if (projectId) {
      tasks = tasks.filter((t) => t.projectId === projectId)
    }

    // 依狀態篩選
    if (status) {
      tasks = tasks.filter((t) => t.status === status)
    }

    // 依優先級篩選
    if (priority) {
      tasks = tasks.filter((t) => t.priority === priority)
    }

    // 依負責人篩選
    if (assignee) {
      tasks = tasks.filter((t) => t.assignee?.id === assignee)
    }

    // 關鍵字搜尋
    if (search) {
      const keyword = search.toLowerCase()
      tasks = tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(keyword) ||
          t.description.toLowerCase().includes(keyword)
      )
    }

    // 排序
    if (sort) {
      switch (sort) {
        case 'createdAt_desc':
          tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          break
        case 'createdAt_asc':
          tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          break
        case 'dueDate':
          tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          break
        case 'priority': {
          const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
          tasks.sort(
            (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
          )
          break
        }
        default:
          break
      }
    }

    return HttpResponse.json(tasks)
  }),

  // GET /api/tasks/:id
  http.get('/api/tasks/:id', async ({ params }) => {
    await delay(200)

    const { id } = params
    const task = db.tasks.find((t) => t.id === id)

    if (!task) {
      return HttpResponse.json(
        { error: '任務不存在' },
        { status: 404 }
      )
    }

    // 附帶留言與活動紀錄（模擬）
    const comments = Array.from(
      { length: faker.number.int({ min: 0, max: 5 }) },
      (_, i) => {
        const user = faker.helpers.arrayElement(db.users)
        return {
          id: `comment-${faker.string.nanoid(6)}`,
          text: faker.lorem.sentence(),
          user: { id: user.id, name: user.name, avatar: user.avatar },
          createdAt: faker.date.recent({ days: 14 }).toISOString(),
        }
      }
    ).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

    const activities = Array.from(
      { length: faker.number.int({ min: 2, max: 6 }) },
      (_, i) => {
        const user = faker.helpers.arrayElement(db.users)
        return {
          id: `activity-${faker.string.nanoid(6)}`,
          type: faker.helpers.arrayElement([
            'created',
            'status_changed',
            'assigned',
            'priority_changed',
            'comment_added',
          ]),
          message: faker.helpers.arrayElement([
            `${user.name} 建立了此任務`,
            `${user.name} 將狀態改為「進行中」`,
            `${user.name} 指派給 ${faker.person.fullName()}`,
            `${user.name} 將優先級改為「高」`,
            `${user.name} 新增了留言`,
          ]),
          user: { id: user.id, name: user.name, avatar: user.avatar },
          timestamp: faker.date.recent({ days: 14 }).toISOString(),
        }
      }
    ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

    return HttpResponse.json({
      ...task,
      comments,
      activities,
    })
  }),

  // POST /api/tasks
  http.post('/api/tasks', async ({ request }) => {
    await delay(400)

    const body = await request.json()
    const now = new Date().toISOString()

    const newTask = {
      id: `task-${faker.string.nanoid(8)}`,
      title: body.title,
      description: body.description || '',
      status: body.status || 'todo',
      priority: body.priority || 'medium',
      assignee: body.assignee || null,
      dueDate: body.dueDate || null,
      tags: body.tags || [],
      checklist: body.checklist || [],
      attachments: [],
      projectId: body.projectId,
      createdBy: body.createdBy || {
        id: db.users[0].id,
        name: db.users[0].name,
        avatar: db.users[0].avatar,
      },
      createdAt: now,
      updatedAt: now,
    }

    db.tasks.push(newTask)

    return HttpResponse.json(newTask, { status: 201 })
  }),

  // PATCH /api/tasks/:id
  http.patch('/api/tasks/:id', async ({ params, request }) => {
    await delay(300)

    const { id } = params
    const body = await request.json()
    const index = db.tasks.findIndex((t) => t.id === id)

    if (index === -1) {
      return HttpResponse.json(
        { error: '任務不存在' },
        { status: 404 }
      )
    }

    db.tasks[index] = {
      ...db.tasks[index],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return HttpResponse.json(db.tasks[index])
  }),

  // DELETE /api/tasks/:id
  http.delete('/api/tasks/:id', async ({ params }) => {
    await delay(300)

    const { id } = params
    const index = db.tasks.findIndex((t) => t.id === id)

    if (index === -1) {
      return HttpResponse.json(
        { error: '任務不存在' },
        { status: 404 }
      )
    }

    db.tasks.splice(index, 1)

    return HttpResponse.json({ success: true })
  }),
]
