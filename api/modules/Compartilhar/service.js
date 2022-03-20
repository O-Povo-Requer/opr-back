const connection = require('../../database/connections');
const NotFoundError = require('../../error/NotFoundError');

module.exports = {
    async compartilhar(idDoRequerimento, user) {
        await validarRequerimentoId(idDoRequerimento)

        const compatilhamento = {
            requerimento: idDoRequerimento,
            cpf: user.cpf,
            tipo_usuario: "cidadao"
        }

        await connection('compartilhamento').insert(compatilhamento)
    },
    async descompartilhar(idDoRequerimento, user) {

    }
}

async function validarRequerimentoId(idDoRequerimento) {
    const requerimentoOptional = await connection('requerimento').where('id', idDoRequerimento)

    if (requerimentoOptional.length < 1) {
        throw new NotFoundError('Requerimento não existe')
    }
}