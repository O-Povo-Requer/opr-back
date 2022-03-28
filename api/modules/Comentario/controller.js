const connection = require('../../database/connections')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {

    /**
     * Realiza o cadastro de um comentário
     */
    async create(req, res, next){
        let tipo_usuario ='cidadao'
        try {
            //Pega os dados da requisição
            const {requerimento, comentario} = req.body
             // pra pegar o cpf 
             const token = req.headers.authorization.split(' ')[1]
             const dados_requisicao = jwt.decode(token)
             const cpf_usuario = dados_requisicao.cpf

         

            // Faz a consulta o banco de dados do Cidadão
            let consulta = await connection('cidadao').where('cpf', cpf_usuario).select('*');
                
            if (consulta.length < 1) {
                // se não acha, busca no Banco de dados do Legislador
                consulta = await connection('legislador').where('cpf', cpf_usuario).select('*')
                if (consulta.length < 1) {
                    return res.status(409).send({ mensagem: 'Usuário não cadastrado' })
                }
                tipo_usuario = 'legislador'

            }
            
            //Cadastra o comentario no banco de dados
            await connection('comentario').insert({
                cpf_usuario,
                requerimento,
                comentario,
                tipo_usuario,
            })
            //obtendo o id cadastrado
            consulta = await connection('comentario').where('cpf_usuario',cpf_usuario).andWhere('requerimento', requerimento).select('*');
            const id = consulta[consulta.length - 1].id;

            return res.status(201).send({ 
                mensagem: 'Comentario cadastrado!',
                ComentarioCriado: {
                    id,
                    cpf_usuario,
                    requerimento,
                    comentario,
                    tipo_usuario
                }
                
            })
              
        } catch (error) {
            return res.status(500).send({ error: error });
        }

    },

    /**
     * Realiza a atualização de um comentario 
     */
    async update(req, res, next){
        try {
            //Pega os dados da requisição
            const {id,comentario} = req.body
            // pra pegar o cpf 
            const token = req.headers.authorization.split(' ')[1]
            const dados_requisicao =  jwt.decode(token)
            //Faz a consulta ao Banco de dados
            const consulta = await connection('comentario').where('id', id).select('*');
            //Verirfica se existe registro
            if (consulta.length<1) {
                return res.status(409).send({ mensagem: 'Comentario não cadastrado' });
            }
            //verifica se quem faz a requisição é quem cadastrou a atividade ( ou admin)
            if((dados_requisicao.cpf != consulta[0].cpf_usuario) | token == '123') {
                return res.status(409).send({ mensagem: 'Usuário não cadastrou o comentario requerido' })
            }
            let requerimento = consulta[0].requerimento
            let tipo_usuario = consulta[0].tipo_usuario
            //Atualiza os dados do atividade
            await connection('comentario').where('id', id).update({
                comentario   
            })
            return res.status(200).send({ 
                mensagem: 'Comentário Alterado!',
                comentarioAlterada: {
                    id,
                    cpf_usuario,
                    requerimento,
                    comentario,
                    tipo_usuario
                    
                }
            })

        } catch (error) {
            return res.status(500).send({ error: error })
        }
    },

    /**
     * Realiza a exclusão de uma atividade
     */
    async delete(req, res, next){
        try {
            //Pega os dados da requisição
            const id = req.body.id
            // pra pegar o cpf 
            const token = req.headers.authorization.split(' ')[1]
            const dados_requisicao =  jwt.decode(token)

            //Faz a consulta ao Banco de dados
            const consulta = await connection('comentario').where('id', id)
            //Verirfica se existe registro
            if (consulta.length<1) {
                return res.status(409).send({ mensagem: 'Comentario não cadastrado' })
            }
            //verifica se quem faz a requisição é quem cadastrou a atividade ( ou admin)
            if((dados_requisicao.cpf != consulta[0].cpf_usuario) | token == '123') {
                return res.status(409).send({ mensagem: 'Usuário não cadastrou o comentario requerido' })
            }
            //Apaga o registro do comentario
            await connection('comentario').where('id', id).del()
            return res.status(200).send({ 
                mensagem: 'Comentario excluido!',
                comentarioExcluido: {
                    id
                }
            })
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    },

    /**
     * Realiza a recuperação de uma atividade
     */
    async get(req, res, next){
        try {
            //Pega os dados da requisição
            const id = req.body.id
            //Faz a consulta ao Banco de dados
            const consulta = await connection('comentario').where('id', id).select('*')
            //Verirfica se existe registro
            if (consulta.length>0) {
                const comentario = consulta[0]
                const autor = await connection('cidadao').where('cpf', comentario.cpf_usuario).select('*').first()
                const final = {
                    nome: autor.nome,
                    cidade: autor.cidade,
                    cpf_autor: autor.cpf,
                    id: comentario.id,
                    requerimento: comentario.requerimento,
                    comentario: comentario.comentario,
                    tipo_de_usuario: comentario.tipo_de_usuario
                }
                return res.json(final)
            }else{
                throw new Error('404 - Not Found')
            }   
        } catch (error) {
            return res.status(500).send({ mensagem: 'Atividade não cadastrada!' })
        }
    },

    /**
     * Realiza a listagem dos comentarios
     */
    async list(req, res, next){
        try {
            //Faz a consulta ao Banco de dados
            const comentarios = await connection('comentario').select('*');
            return res.status(200).send({ 
                comentarios: comentarios
            })
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    },


   

}