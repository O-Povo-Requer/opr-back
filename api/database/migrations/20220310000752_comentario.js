exports.up = function(knex) {
    return knex.schema.createTable('comentario', function name(table) {
        table.increments();
        table.string('cpf_usuario').notNullable();
        table.string('requerimento').notNullable();
        table.string('comentario').notNullable();
        table.string('tipo_usuario').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('comentario')
};
