import 'dotenv/config'
import {z} from 'zod'

const envSchema = z.object({
    DATABASE_HOST: z.string().ip("v4"),
    DATABASE_TYPE: z.enum(['mysql2']),
    DATABASE_PORT: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
    PORT: z.number().default(3000)
})

export const env = envSchema.parse(process.env)