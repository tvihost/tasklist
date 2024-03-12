import { FastifyInstance } from "fastify"
import { z } from 'zod'
import crypto from 'node:crypto'
import cookie from '@fastify/cookie'
import { knexQB } from "../config/database"

export async function authRoutes(app: FastifyInstance) {
    app.post('/login', async (request, reply) => {

        const doLoginSchema = z.object({
            email: z.string(),
            password: z.string()
        })

        const { email, password } = doLoginSchema.parse(request.body)

        const findAccount = await knexQB('users').where('email', email).andWhere('password',password).first('id')

        if(findAccount !== undefined)
        {
            const sessionId = crypto.randomUUID()
            const { id } = findAccount
            const storeSession = await knexQB('sessions').insert({
                id: sessionId,
                user_id: id
            })
            return reply.cookie("sessionId", sessionId).send()
        }

        return reply.status(401).send
    })
}