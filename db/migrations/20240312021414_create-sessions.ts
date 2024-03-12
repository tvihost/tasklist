import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('sessions', (table) => {
        table.uuid('id').primary
        table.uuid('user_id')
        table.timestamp('time').defaultTo(knex.fn.now()).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('sessions')
}