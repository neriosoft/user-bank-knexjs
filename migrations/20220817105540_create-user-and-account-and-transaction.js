/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email', 100).unique().notNullable();
        table.string('password').notNullable();
    })
    .createTable('accounts', table => {
        table.increments('id').primary();
        table.string('accountNo').unique().notNullable();
        table.decimal('balance').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.integer('user').unsigned().notNullable().references('id').inTable('users');
    })
    .createTable('transactions', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.decimal('amount').notNullable();
        table.enu('transactionType', ['fund', 'transfer', 'withdraw']).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.integer('account').unsigned().notNullable().references('id').inTable('accounts');
        
        
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users')
  .dropTable('accounts').dropTable('transactions');
};
