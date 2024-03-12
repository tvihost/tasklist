import { FastifyInstance } from "fastify"
import { z } from 'zod'
import crypto from 'node:crypto'
import { knexQB } from "../config/database"
import { authMiddleware } from '../middlewares/authMiddleware'

export async function tasksRoutes(app: FastifyInstance) {

    app.addHook('preHandler', authMiddleware)

    app.get('/', async () => {
        const tasks = await knexQB('tasks').select()
        return { tasks }
    })

    app.get('/:id', async (request,reply) => {
        const getTasksSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = getTasksSchema.parse(request.params);
        const task = await knexQB('tasks').where('id', id).first()
        return { task }
    })

    app.post('/', async (request, reply) => {

        const createTasksSchema = z.object({
            title: z.string(),
            description: z.string()
        })

        const { title, description } = createTasksSchema.parse(request.body)

        await knexQB('tasks').insert({
            id: crypto.randomUUID(),
            user_id: crypto.randomUUID(),
            title: title,
            description: description
        })

        return reply.status(201).send
    })
}