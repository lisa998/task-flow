// src/mocks/handlers/auth.js
import { http, HttpResponse, delay } from 'msw'
import { db } from '../data/db'

export const authHandlers = [
  // POST /api/login
  http.post('/api/login', async ({ request }) => {
    await delay(500)

    const { email, password } = await request.json()

    const user = db.users.find(
      (u) => u.email === email && u.password === password
    )

    if (!user) {
      return HttpResponse.json(
        { error: '帳號或密碼錯誤' },
        { status: 401 }
      )
    }

    // 產生假 token
    const token = `fake-jwt-${user.id}-${Date.now()}`

    return HttpResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    })
  }),
]
