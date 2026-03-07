// src/mocks/handlers/settings.js
import { http, HttpResponse, delay } from 'msw'
import { db } from '../data/db'

export const settingsHandlers = [
  // GET /api/settings
  http.get('/api/settings', async () => {
    await delay(200)

    return HttpResponse.json(db.settings)
  }),

  // PATCH /api/settings
  http.patch('/api/settings', async ({ request }) => {
    await delay(400)

    const body = await request.json()

    // 深層合併 settings
    if (body.profile) {
      db.settings.profile = {
        ...db.settings.profile,
        ...body.profile,
      }
    }

    if (body.preferences) {
      db.settings.preferences = {
        ...db.settings.preferences,
        ...body.preferences,
      }
    }

    return HttpResponse.json(db.settings)
  }),
]
