const service = require('./service');
const connection = require('../../database/connections')

module.exports = {
    async create(req, res, next) {
        try {
            const { body } = req;
            const response = await service.create_requerimento(body, req.user);
            return res.status(201).send({
                mensagem: 'Requerimento criado!',
                requerimentoCriado: response
            });
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
            const { titulo, offset=10, page=1, orderBy, direction='asc' } = req.query;
            const response = await service.lista_requerimento(titulo, offset, page, orderBy, direction);
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
    //Retorna a análise/contagem dos status dos requerimentos
    async analysis(req, res, next) {
        try {
            //Faz a busca no banco de dados
            let consulta = await connection('requerimento').select('*');
            //conta os requerimentos totais
            let req_totais =  consulta.length
            //conta os requisitos nã oaceitos
            let nao_aceitos = await connection('requerimento').where('status', 'não aceito').count();
            let concluidos = await connection('requerimento').where('status', 'concluido').count();
            let req_nao_aceitos = nao_aceitos[0].count;
            let req_concluidos = concluidos[0].count;
            let req_em_avaliacao = req_totais - req_nao_aceitos - req_concluidos;
            
            return res.status(200).send({
                analise_requisicoes: {
                    req_totais,
                    req_em_avaliacao,
                    req_nao_aceitos,
                    req_concluidos
                }

            });
        }catch (err) {
            return res.status(400).send(err.message);
        }
    },
}
