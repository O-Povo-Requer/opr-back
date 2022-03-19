const connection = require('../../database/connections')

module.exports = {

    /**
     * Retorna os requerimentos com mais engajamento
     */
    async emalta(req, res, next){
        try {
            let emAlta = []

            const curtidas = await connection('curtida').select('requerimento').groupBy('requerimento').as('Quantidade').count()

            curtidas.map(async (curtida) => {
                    const requerimento = await connection('requerimento').where('id', curtida.requerimento).select('*').first()
                    
                    const autor = await connection('cidadao').where('cpf', requerimento.cpf_criador).select('*').first()
                    
                    let coment = null
                    try {
                        coment = await connection('comentario').where('requerimento', parseInt(requerimento.id)).select('*').count()
                    } catch (error) {
                        coment = 0
                    }

                    const final = {
                        nome: autor.nome,
                        cidade: autor.cidade,
                        titulo: requerimento.titulo,
                        descricao: requerimento.descricao,
                        curtidas: curtida.count,
                        comentarios: coment
                    }

                    emAlta.push(final)
            })

            setTimeout(() => {
                return res.status(200).send({ 
                    emalta: emAlta
                })    
            }, 1000);
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    },
}