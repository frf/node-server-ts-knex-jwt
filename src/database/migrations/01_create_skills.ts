import Knex from 'knex';

export  async function up(knex: Knex) {
    return knex.schema.createTable('skills', table => {
        table.increments('id').primary();
        table.string('lang').notNullable();
        table.decimal('cost').notNullable();

        table.integer('user_id').unsigned()
        table.foreign('user_id')
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('skills');
}