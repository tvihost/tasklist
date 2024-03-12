import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('tasks', (table) => {
        table.uuid('id').primary
        table.uuid('user_id').notNullable()
        table.string('title', 255).notNullable()
        table.text('description').notNullable()
        table.enum('status',['ATIVO', 'CONCLUIDO', 'CANCELADO']).defaultTo('ATIVO')
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('tasks')
}

