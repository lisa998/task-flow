// src/mocks/handlers/notifications.js
import { http, HttpResponse, delay } from 'msw'
import { db } from '../data/db'

export const notificationHandlers = [
  // GET /api/notifications
  http.get('/api/notifications', async () => {
    await delay(200)

    return HttpResponse.json(db.notifications)
  }),

  // PATCH /api/notifications/:id/read
  http.patch('/api/notifications/:id/read', async ({ params }) => {
    await delay(200)

    const { id } = params
    const notif = db.notifications.find((n) => n.id === id)

    if (!notif) {
      return HttpResponse.json(
        { error: '通知不存在' },
        { status: 404 }
      )
    }

    notif.read = true

    return HttpResponse.json(notif)
  }),

  // POST /api/notifications/mark-all-read
  http.post('/api/notifications/mark-all-read', async () => {
    await delay(200)

    db.notifications.forEach((n) => {
      n.read = true
    })

    return HttpResponse.json({ success: true })
  }),
]
