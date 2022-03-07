exports.up = function(knex) {
    return knex.schema.createTable('cidadao', function name(table) {
        table.string('cpf').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('cidade');
        table.string('senha').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('cidadao')
};
