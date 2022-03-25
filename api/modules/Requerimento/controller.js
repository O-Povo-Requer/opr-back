const service = require('./service');
const connection = require('../../database/connections')

module.exports = {
    async create(req, res, next) {
        try {
            const { body } = req;
            const response = await service.create_requerimento(body, req.user);
            return res.status(201).send(response);
        }catch (err) {
            //console.log(err)
            return res.status(400).send(err.message);
        }
    },

    async update(req, res, next) {
        try {
            const { body, params } = req;
            const response = await service.update_requerimento(body, req.user, params.id);
            return res.status(204).send(response);
        }catch (err) {
            return res.status(400).send(err.message);
        }
    },

    async get(req, res, next) {
        try {
            const { id } = req.params;
            const response = await service.visualiza_requerimento(id);
            return res.status(200).send(response);
        }catch (err) {
            return res.status(400).send(err.message);
        }
    },

    async getAll(req, res, next) {
        try {
            const { value } = req.query;
            const response = await service.lista_requerimento(value);
            return res.status(200).send(response);
        }catch (err) {
            return res.status(400).send(err.message);
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await service.delete_requerimento(id, req.user);
            return res.sendStatus(200);
        }catch (err) {
            return res.status(400).send(err.message);
        }
    },

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

    async analysis(req, res, next) {
        try {
            let consulta = await connection('requerimento').select('*');
            let req_totais =  consulta.length
            let nao_aceitas = await connection('requerimento').where('status', 'não aceita').count();
            let concluidas = await connection('requerimento').where('status', 'concluida').count();
            let req_nao_aceitas = nao_aceitas[0].count;
            let req_concluidas = concluidas[0].count;
            let req_em_avaliacao = req_totais - req_nao_aceitas - req_concluidas;
            
            return res.status(200).send({
                analise_requisicoes: {
                    req_totais,
                    req_em_avaliacao,
                    req_nao_aceitas,
                    req_concluidas
                }

            });
        }catch (err) {
            return res.status(400).send(err.message);
        }
    },
}
