// src/mocks/handlers/projects.js
import { http, HttpResponse, delay } from 'msw'
import { faker } from '@faker-js/faker/locale/zh_TW'
import { db } from '../data/db'

export const projectHandlers = [
  // GET /api/projects
  http.get('/api/projects', async () => {
    await delay(300)

    const projects = db.projects.map((p) => ({
      ...p,
      taskCount: db.tasks.filter((t) => t.projectId === p.id).length,
    }))

    return HttpResponse.json(projects)
  }),

  // POST /api/projects
  http.post('/api/projects', async ({ request }) => {
    await delay(400)

    const body = await request.json()
    const now = new Date().toISOString()

    const newProject = {
      id: `proj-${faker.string.nanoid(6)}`,
      name: body.name,
      description: body.description || '',
      status: body.status || 'active',
      owner: body.owner || {
        id: db.users[0].id,
        name: db.users[0].name,
        avatar: db.users[0].avatar,
      },
      members: body.members || [
        {
          id: db.users[0].id,
          name: db.users[0].name,
          avatar: db.users[0].avatar,
        },
      ],
      createdAt: now,
      updatedAt: now,
    }

    db.projects.push(newProject)

    return HttpResponse.json(newProject, { status: 201 })
  }),

  // PATCH /api/projects/:id
  http.patch('/api/projects/:id', async ({ params, request }) => {
    await delay(300)

    const { id } = params
    const body = await request.json()
    const index = db.projects.findIndex((p) => p.id === id)

    if (index === -1) {
      return HttpResponse.json(
        { error: '專案不存在' },
        { status: 404 }
      )
    }

    db.projects[index] = {
      ...db.projects[index],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return HttpResponse.json(db.projects[index])
  }),

  // DELETE /api/projects/:id
  http.delete('/api/projects/:id', async ({ params }) => {
    await delay(300)

    const { id } = params
    const index = db.projects.findIndex((p) => p.id === id)

    if (index === -1) {
      return HttpResponse.json(
        { error: '專案不存在' },
        { status: 404 }
      )
    }

    db.projects.splice(index, 1)
    // 同時刪除該專案的所有任務
    db.tasks = db.tasks.filter((t) => t.projectId !== id)

    return HttpResponse.json({ success: true })
  }),
]
