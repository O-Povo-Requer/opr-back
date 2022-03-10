exports.up = function(knex) {
    return knex.schema.createTable('atividade', function name(table) {
        table.increments();
        table.string('titulo').notNullable();
        table.string('link').notNullable();
        table.string('data').notNullable();
        table.string('descricao');
        table.string('legisladores');
        table.boolean('status');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('atividade')
};
