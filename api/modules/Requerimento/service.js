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

        await connection('requerimento').insert(requerimento);

        delete requerimento.cpf_criador;

        return requerimento;
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
        const requerimento = (await connection('requerimento').where('id', id))[0];

        if (!requerimento) {
            throw new Error('Requerimento não existe');
        }

        delete requerimento.cpf_criador;

        return requerimento;
    },

    async lista_requerimento(query, limit = 10, page) {
        let offset;
        let requerimentos;
        if (page > 1) {
            offset = page * limit;
        };

        if (query) {
            requerimentos = await connection('requerimento')
                .whereLike('titulo', `%${query}%`)
                .orWhereLike('descricao', `%${query}%`)
                .orWhereLike('legisladores', `%${query}%`)
                .offset(offset)
                .limit(limit);
        } else {
            requerimentos = await connection('requerimento')
                .offset(offset)
                .limit(limit);
        }

        
        return requerimentos;
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