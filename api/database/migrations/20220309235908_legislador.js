exports.up = function(knex) {
    return knex.schema.createTable('legislador', function name(table) {
        table.string('cpf').primary();
        table.string('nome').notNullable();
        table.string('partido').notNullable();
        table.string('email').notNullable();
        table.string('cidade');
        table.string('senha').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('legislador')
};
