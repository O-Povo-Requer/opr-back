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
    }

    
}