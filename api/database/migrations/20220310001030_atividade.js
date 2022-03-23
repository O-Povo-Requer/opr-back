exports.up = function(knex) {
    return knex.schema.createTable('atividade', function name(table) {
        table.increments();
        table.string('titulo').notNullable();
        table.string('link').notNullable();
        table.string('data_ocorrencia').notNullable();
        table.string('descricao');
        table.string('legisladores');
        table.boolean('status');
        table.string('cpf_usuario').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('atividade')
};
