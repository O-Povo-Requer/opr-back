const connection = require('../../database/connections');
const NotFoundError = require('../../error/NotFoundError');

module.exports = {

    async compartilhar(idDoRequerimento, user) {
        await validarRequerimentoId(idDoRequerimento)

        const compartilhamento = getCompartilhamentoByRequerimentoIdAndCpf(idDoRequerimento, user.cpf)

        if (compartilhamento == null) {
            const compatilhamento = {
                requerimento: idDoRequerimento,
                cpf: user.cpf,
                tipo_usuario: "cidadao"
            }
    
            await connection('compartilhamento').insert(compatilhamento)

            return "Requerimento compartilhado com sucesso!"
        }

        return "Não é possível compartilhar o mesmo requerimento mais de uma."
    },

    async descompartilhar(idDoRequerimento, user) {
        await validarRequerimentoId(idDoRequerimento)

        const compartilhamento = getCompartilhamentoByRequerimentoIdAndCpf(idDoRequerimento, user.cpf)

        if (compartilhamento != null) {
            await connection('compartilhamento').del().where('id', compartilhamento.id)

            return "Requerimento descompartilhado com sucesso."
        }
        
        return "Não é possível descompartilhar algo que não está sendo compartilhado."
    }
}

async function validarRequerimentoId(idDoRequerimento) {
    const requerimentoOptional = await connection('requerimento').where('id', idDoRequerimento)

    if (requerimentoOptional.length < 1) {
        throw new NotFoundError('Requerimento não existe')
    }
}

async function getCompartilhamentoByRequerimentoIdAndCpf(idDoRequerimento, cpf) {
    const requerimentoOptional = await connection('compartilhamento').where('cpf', cpf).andWhere('requerimento', idDoRequerimento)

    if (requerimentoOptional.length > 0) {
        return requerimentoOptional[0]
    }
    return null;
}