import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import crypto from 'node:crypto'
import cookie from '@fastify/cookie'
import { knexQB } from "../config/database"

function denyAccess(reply: FastifyReply)
{
  reply.code(401).send({ error: 'Unauthorized operation.' })
  return
}

export async function authRoutes(app: any) {
    app.post('/login', async (request:any, reply:any) => {

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
            return reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 1 // 1 dia
            }).send()
        }

        return reply.status(401).send()
    })

    app.get('/logout', async (request:any, reply:any) => {
        const sessionId = request.cookies.sessionId
        if(!sessionId)  
        {
            denyAccess(reply)
        }

        await knexQB('sessions').where('id',sessionId).delete()


        reply.clearCookie('sessionId').send({"message":"Logout realizado com sucesso"})
    })

    app.get('/checkSession',async (request:any, reply:any) => {
        const sessionId = request.cookies.sessionId

        if (!sessionId) {
          denyAccess(reply)
        }
        
        const checkSessionId = await knexQB('sessions').where('id',sessionId).first()
      
        if(!checkSessionId) {
          denyAccess(reply)
        }

        reply.code(200).send({"isLoggedIn":true})
    })
}