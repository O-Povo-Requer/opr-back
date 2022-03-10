exports.up = function(knex) {
    return knex.schema.createTable('requerimento', function name(table) {
        table.increments();
        table.string('cpf_criador').notNullable();
        table.string('titulo').notNullable();
        table.string('localidade').notNullable();
        table.string('descricao').notNullable();
        table.string('data');
        table.string('tags');
        table.string('multimidia');
        table.string('legisladores');
        table.string('status');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('requerimento')
};
