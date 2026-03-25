// src/mocks/handlers/auth.js
import {delay, http, HttpResponse} from 'msw'
import {db} from '../data/db'

export const authHandlers = [
    // POST /api/login
    http.post('/api/login', async ({request}) => {
        await delay(500)

        const {email, password} = await request.json()

        const user = db.users.find(
            (u) => u.email === email && u.password === password
        )

        if (!user) {
            return HttpResponse.json(
                {error: '帳號或密碼錯誤'},
                {status: 401}
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

    // GET /api/me
    http.get('/api/me', async ({request}) => {
        await delay(300)

        const authorization = request.headers.get('Authorization')
        const token = authorization?.replace('Bearer ', '')

        if (!token) {
            return HttpResponse.json({error: '未提供 token'}, {status: 401})
        }

        // token 格式: fake-jwt-{userId}-{timestamp}
        const userId = token.split('-')[2]
        const user = db.users.find((u) => String(u.id) === String(userId))

        if (!user) {
            return HttpResponse.json({error: 'token 無效'}, {status: 401})
        }

        return HttpResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        })
    }),

]
