import type { Knex } from "knex";
import crypto from 'node:crypto'

export async function up(knex: Knex): Promise<void> {
  return knex('users').insert([
    { id: crypto.randomUUID(), name: "Usuario A", email: "a@usuario.com", password: "123456" },
    { id: crypto.randomUUID(), name: "Usuario B", email: "b@usuario.com", password: "654321" },
  ])
}


export async function down(knex: Knex): Promise<void> {
}

