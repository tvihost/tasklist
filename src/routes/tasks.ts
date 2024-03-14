import { z } from 'zod'
import crypto from 'node:crypto'
import { knexQB } from "../config/database"
import { authMiddleware } from '../middlewares/authMiddleware'

export async function tasksRoutes(app: any) {

    app.addHook('preHandler', authMiddleware)

    app.get('/', async () => {
        const tasks = await knexQB('tasks').select()
        return { tasks }
    })

    app.get('/:id', async (request:any,reply:any) => {
        const getTaskSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = getTaskSchema.parse(request.params);

        const sessionId = request.cookies.sessionId

        const { user_id } = await knexQB('sessions').where('id', sessionId).first('user_id')

        const task = await knexQB('tasks').where({
            id:id,
            user_id:user_id
        }).first()
        return { task }
    })

    app.put('/:id', async (request:any,reply:any) => {

        const paramsUpdateTaskSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = paramsUpdateTaskSchema.parse(request.params);

        const bodyUpdateTaskSchema = z.object({
            title: z.string(),
            description: z.string(),
            status: z.enum(['ATIVO','CONCLUIDO','CANCELADO'])
        })

        const { title, description, status } = bodyUpdateTaskSchema.parse(request.body)

        const sessionId = request.cookies.sessionId
        const { user_id } = await knexQB('sessions').where('id', sessionId).first('user_id')

        const updateTask = await knexQB('tasks').where({
            id:id,
            user_id:user_id
        }).update({
            title:title,
            description:description,
            status:status
        })

        if(updateTask === 1)
        {
            return reply.status(204).send()
        }

        return reply.status(404).send({'error':'Tarefa não encontrada.'})
    })

    app.post('/', async (request:any,reply:any) => {

        const requestCreateTasksSchema = z.object({
            title: z.string(),
            description: z.string(),
        })

        const { title, description } = requestCreateTasksSchema.parse(request.body)

        const sessionId = request.cookies.sessionId

        const { user_id } = await knexQB('sessions').where('id', sessionId).first('user_id')

        const task_id = crypto.randomUUID()

        await knexQB('tasks').insert({
            id: task_id,
            user_id: user_id,
            title: title,
            description: description
        })

        return reply.status(201).send({"id":task_id})
    })

    app.delete('/:id', async (request:any,reply:any) => {
        const deleteTaskSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = deleteTaskSchema.parse(request.params);

        const sessionId = request.cookies.sessionId

        const { user_id } = await knexQB('sessions').where('id', sessionId).first('user_id')

        const task = await knexQB('tasks').where({
            id:id,
            user_id:user_id
        }).delete()
        
        if(task === 1)
        {
            return reply.status(204).send()
        }

        return reply.status(404).send({'error':'Tarefa não encontrada.'})
    })
}