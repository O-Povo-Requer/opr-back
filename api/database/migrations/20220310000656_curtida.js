exports.up = function(knex) {
    return knex.schema.createTable('curtida', function name(table) {
        table.increments();
        table.string('cpf').notNullable();
        table.string('requerimento').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('curtida')
};
