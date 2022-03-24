const connection = require('../../database/connections');
const NotFoundError = require('../../error/NotFoundError');

module.exports = {

    async compartilhar(idDoRequerimento, user) {
        await validarRequerimentoId(idDoRequerimento)

        const compartilhamento = await getCompartilhamentoByRequerimentoIdAndCpf(idDoRequerimento, user.cpf)

        if (compartilhamento == null) {
            const compatilhamento = {
                requerimento: idDoRequerimento,
                cpf: user.cpf,
                tipo_usuario: "cidadao"
            }
    
            await connection('compartilhamento').insert(compatilhamento)

            return "Requerimento compartilhado com sucesso!"
        }

        return "Este requerimento já foi compartilhar."
    },

    async descompartilhar(idDoRequerimento, user) {
        await validarRequerimentoId(idDoRequerimento)

        const compartilhamento = await getCompartilhamentoByRequerimentoIdAndCpf(idDoRequerimento, user.cpf)

        if (compartilhamento != null) {

            await connection('compartilhamento').del().where('requerimento', idDoRequerimento).andWhere('cpf', user.cpf)

            return "Requerimento descompartilhado com sucesso."
        }

        return "Não é possível descompartilhar algo que não está sendo compartilhado."
    },

    async compartilhamentosByUserCpf(userCpf) {
        const idsRequerimentos = await getIdRequerimentosCompartilhadosByCpf(userCpf)
    
        var requerimentos = await getRequerimentosByIds(idsRequerimentos)

        requerimentos.sort(function (a,b) {
            const [Ayear, Amonth, Aday] = a.data.split("/").map(x => parseInt(x));
            const [Byear, Bmonth, Bday] = b.data.split("/").map(x => parseInt(x));

            const dataA = new Date(0).setFullYear(Ayear, Amonth, Aday)
            const dataB = new Date(0).setFullYear(Byear, Bmonth, Bday)
            
            return dataB - dataA;
        })

        return requerimentos
    }

}

async function validarRequerimentoId(idDoRequerimento) {
    const requerimentoOptional = await connection('requerimento').where('id', idDoRequerimento)

    if (requerimentoOptional.length < 1) {
        throw new NotFoundError('Requerimento não existe')
    }
}

async function getRequerimentosByIds(ids) {
    return await connection('requerimento').whereIn('id', ids)
}

async function getCompartilhamentoByRequerimentoIdAndCpf(idDoRequerimento, cpf) {
    const requerimentoOptional = await connection('compartilhamento').where('cpf', cpf).andWhere('requerimento', idDoRequerimento)

    if (requerimentoOptional.length > 0) {
        return requerimentoOptional[0]
    }

    return null;
}

async function getIdRequerimentosCompartilhadosByCpf(cpf) {
    const resultFromQuery = await connection('compartilhamento').select('requerimento').where('cpf', cpf)
    const ids = resultFromQuery.map(r => r.requerimento)
    return ids
}