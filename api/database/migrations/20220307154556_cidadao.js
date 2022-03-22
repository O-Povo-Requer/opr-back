exports.up = function(knex) {
    return knex.schema.createTable('cidadao', function name(table) {
        table.string('cpf').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('cidade');
        table.string('senha').notNullable();
        table.date('data_ultima_atividade').defaultTo(new Date(Date.now()).toISOString()).notNullable();
        table.integer('n_atividades_semana').defaultTo(0);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('cidadao')
};
