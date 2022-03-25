const connection = require('../../database/connections');

module.exports = {
    async create_requerimento(body, user) {
        const { titulo, localidade, descricao, data, tags, legisladores } = body;
        if (!titulo || !localidade || !descricao || !data) {
            throw new Error('Informações inválidas');
        }

        const requerimento_existe = await connection('requerimento')
            .where('cpf_criador', user.cpf)
            .andWhere('titulo', titulo);


        if (requerimento_existe.length > 0) {
            throw new Error('Requerimento já existe');
        }

        const requerimento = {
            cpf_criador: user.cpf,
            titulo,
            localidade,
            descricao,
            data,
            tags,
            legisladores
        }

        const response = (await connection('requerimento')
            .insert(requerimento, ['id', 'titulo', 'localidade', 'descricao', 'data', 'tags', 'legisladores']))[0];

        return response;
    },

    async update_requerimento(body, user, id) {
        const { titulo, localidade, descricao, data, tags, legisladores } = body;

        const requerimento_existe = await connection('requerimento')
            .where('id', id)
            .andWhere('cpf_criador', user.cpf)

        if (requerimento_existe.length === 0) {
            throw new Error('Requerimento não existe');
        }

        const requerimento = {
            titulo,
            localidade,
            descricao,
            data,
            tags,
            legisladores
        }

        await connection('requerimento')
            .where('id', id)
            .update(requerimento);

        return requerimento;
    },

    async visualiza_requerimento(id) {
        const requerimento = (await connection('requerimento').where('id', id)
            .leftJoin('cidadao', 'requerimento.cpf_criador', 'cidadao.cpf')
            .select('requerimento.*', 'cidadao.cidade', 'cidadao.nome')
        )[0];

        if (!requerimento) {
            throw new Error('Requerimento não existe');
        }

        delete requerimento.cpf_criador;

        return requerimento;
    },

    async lista_requerimento(query, limit = 10, page, orderBy='', direction) {
        let offset = 0;
        if (page > 1) {
            offset = page * limit;
        };

        requerimentos = connection('requerimento')
            .leftJoin('cidadao', 'requerimento.cpf_criador', 'cidadao.cpf')
            .select('requerimento.*', 'cidadao.cidade', 'cidadao.nome');
        if(query) {
            requerimentos.whereILike('titulo', `%${query}%`)
        }
        if (orderBy) {
            requerimentos.orderBy(orderBy, direction)
        }
            

        result = await requerimentos.offset(offset).limit(limit);
        
        return result;
    },

    async delete_requerimento(id, user) {
        const requerimento = (await connection('requerimento')
            .where('cpf_criador', user.cpf)
            .andWhere('id', id))[0]

        if (!requerimento) {
            throw new Error('Requerimento não existe ou não pertence ao usuário');
        }

        await connection('requerimento')
            .where('id', id)
            .del()

        return;
    }
}