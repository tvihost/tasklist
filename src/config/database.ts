import { knex, Knex } from "knex";
import {env} from '../env'

export const config: Knex.Config = {
    client: env.DATABASE_TYPE,
    connection: {
        host: env.DATABASE_HOST,
        port: Number(env.DATABASE_PORT),
        user: env.DATABASE_USER,
        password: env.DATABASE_PASSWORD,
        database: env.DATABASE_NAME
    },
    migrations: {
        extension: 'ts',
        directory: './db/migrations/'
    }
}

export const knexQB = knex(config)