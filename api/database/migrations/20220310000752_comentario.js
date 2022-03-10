exports.up = function(knex) {
    return knex.schema.createTable('comentario', function name(table) {
        table.increments();
        table.string('cpf').notNullable();
        table.string('requerimento').notNullable();
        table.string('comentario').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('comentario')
};
