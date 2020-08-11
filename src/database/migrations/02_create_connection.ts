import Knex from 'knex';

export  async function up(knex: Knex) {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        table.integer('user_id').unsigned()
        table.foreign('user_id')
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.timestamp('created_at')
            .defaultTo(knex.raw('NOW()'))
            .notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('connections');
}