const connection = require('../../database/connections');
const NotFoundError = require('../../error/NotFoundError');

module.exports = {

    async curtir(idDoRequerimento, user) {
        await validarRequerimentoId(idDoRequerimento)

        const curtida = await getCurtidaByRequerimentoIdAndCpf(idDoRequerimento, user.cpf)
        const tipo_usuario = await getTipoUsuarioByCpf(user.cpf)

        if (curtida == null) {
            const curtida = {
                requerimento: idDoRequerimento,
                cpf: user.cpf,
                tipo_usuario: tipo_usuario
            }
    
            await connection('curtida').insert(curtida)

            return { mensagem: "Curtida realizada com sucesso!"}
        }

        return { mensagem: "Este requerimento já foi curtido por este usuário."}
    },

    async descurtir(idDoRequerimento, user) {
        await validarRequerimentoId(idDoRequerimento)

        const curtida = await getCurtidaByRequerimentoIdAndCpf(idDoRequerimento, user.cpf)

        if (curtida != null) {

            await connection('curtida').del().where('requerimento', idDoRequerimento).andWhere('cpf', user.cpf)

            return { mensagem: "Requerimento descurtido com sucesso."}
        }

        return { mensagem: "Não é possível descurtir este requerimento, ele não foi curtido anteriormente pelo usuário."}
    },

    async curtidasByUserCpf(user) {

        const idsRequerimentos = await getIdRequerimentosCurtidosByCpf(user.cpf)

        var requerimentos = await getRequerimentosByIds(idsRequerimentos)

        if (requerimentos.length === 0) {
            return { mensagem: "Este usuário ainda não curtiu requerimentos."}
        }

        requerimentos.sort(function (a,b) {
            const [Ayear, Amonth, Aday] = a.data.split("/").map(x => parseInt(x));
            const [Byear, Bmonth, Bday] = b.data.split("/").map(x => parseInt(x));

            const dataA = new Date(0).setFullYear(Ayear, Amonth, Aday)
            const dataB = new Date(0).setFullYear(Byear, Bmonth, Bday)

            return dataB - dataA;
        })

        return { mensagem: "Consulta realizada com sucesso", requerimentos_curtidos: requerimentos}
    },

    async curtidasByRequerimento(idRequerimento) {
        const resultFromQuery = await connection('curtida').where('requerimento', idRequerimento)

        if (resultFromQuery.length === 0) {
            return { mensagem: "Este requerimento ainda não recebeu curtidas."}
        }

        return { mensagem: "Consulta realizada com sucesso", total_curtidas: resultFromQuery.length}
    },

    async verificaCurtidaByRequerimentoAndUserCpf(idRequerimento, user) {
        const resultFromQuery = await connection('curtida').where('requerimento', idRequerimento).andWhere('cpf', user.cpf)

        return { mensagem: "Consulta realizada com sucesso", requerimento_curtido: resultFromQuery.length === 1}

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

async function getCurtidaByRequerimentoIdAndCpf(idDoRequerimento, cpf) {
    const curtidaOptional = await connection('curtida').where('cpf', cpf).andWhere('requerimento', idDoRequerimento)

    if (curtidaOptional.length > 0) {
        return curtidaOptional[0]
    }

    return null;
}

async function getTipoUsuarioByCpf(cpf) {
    const consulta = await connection('cidadao').where('cpf', cpf)
    if (consulta.length > 0) {
        return "cidadao"
    }

    return "legislador";
}

async function getIdRequerimentosCurtidosByCpf(cpf) {
    const resultFromQuery = await connection('curtida').select('requerimento').where('cpf', cpf)
    const ids = resultFromQuery.map(r => r.requerimento)
    return ids
}
