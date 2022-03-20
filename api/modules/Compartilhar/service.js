const connection = require('../../database/connections');
const NotFoundError = require('../../error/NotFoundError');

module.exports = {
    async compartilhar(idDoRequerimento, user) {
        const requerimentoOptional = await connection('requerimento').where('id', idDoRequerimento)
        
        if (requerimentoOptional.length < 1) {
            throw new NotFoundError('Requerimento não existe')
        }

        const requerimento = requerimentoOptional[0]

        
        const compatilhamento = {
            requerimento: requerimento.id,
            cpf: user.cpf,
            tipo_usuario: "cidadao"
        }

        await connection('compartilhamento').insert(compatilhamento)
    },
    async descompartilhar(idDoRequerimento, user) {

    }
}