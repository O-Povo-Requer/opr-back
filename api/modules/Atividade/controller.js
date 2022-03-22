const connection = require('../../database/connections')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {

    /**
     * Realiza o cadastro de atividade
     * 
     * OBS: Foi feita a escolha de não zerar o contador de atividades toda vez no BD.
     * Quando tiver passado 7 dias sempre será contada como a 1° atividade
     * cadastrada, o que gera o mesmo efeito.
     */
    async create(req, res, next){
        //variavvel pra saber em qual bd vamos atualizar o n de atv
        let tipo_usuario = "cidadao"
        const sete_dias = 7*24*3600*1000 // 7 dias em milisegundos
        let data_hoje = new Date(Date.now()).toISOString()
        
        try {
            //Pega os dados da requisição
            const {titulo, link, data_ocorrencia, descricao, legisladores,status, cpf_usuario} = req.body
            
            //Verirfica se existe a atividade já exsite
            let consulta = await connection('atividade').where('titulo', titulo).andWhere('link',link).andWhere('data_ocorrencia', data_ocorrencia)
            console.log(consulta)

            if (consulta.length > 0) {
                return res.status(409).send({ mensagem: 'Atividade já cadastrada.' })
            }
                
            // Faz a consulta o banco de dados do Cidadão
            consulta = await connection('cidadao').where('cpf', cpf_usuario)
                
            if (consulta.length < 1) {
                // se não acha, busca no Banco de dados do Legislador
                consulta = await connection('legislador').where('cpf', cpf_usuario)
                if (consulta.length < 1) {
                    return res.status(409).send({ mensagem: 'Atividade já cadastrada' })
                }
                tipo_usuario = 'legislador'
            }
            
            const tempo_entre_atividades = Date.now() - Date.parse(consulta[0].data_ultima_atividade)
            
            /**
            * verifica se faz mais de 7 dias desde a ultima
            * atividade cadastrada. Se sim, é marcado como a 1° da
            * semana
            */
            if (tempo_entre_atividades > sete_dias ) {
                
                await connection(tipo_usuario).where('cpf',cpf_usuario).update({
                    n_atividades_semana: 1,
                    data_ultima_atividade: data_hoje
                })
                
            } else {
                //Se já cadastrou 2 atv, gera um erro
                if (consulta[0].n_atividades_semana > 1) {
                    const dias_faltando = Math.ceil((sete_dias - tempo_entre_atividades)/(24*3600*1000))
                    
                    return res.status(409).send({ 
                    mensagem: 'Número máximo de atividades cadastradas alcançado. Tente novamente em ' + dias_faltando + " dias."      
                    })
                } else {
                    /**
                     * Se tudo em cima nao ocorrer, é só adicionar 1
                     * ao contador e guardar a data desse cadastro de atv   
                     */
                    let temp = consulta[0].n_atividades_semana + 1
                    await connection(tipo_usuario).where('cpf',cpf_usuario).update({
                    n_atividades_semana: temp,
                    data_ultima_atividade: data_hoje
                    
                    })
                    
                }
                
            }
            
            //Cadastra a atividade no banco de dados
            await connection('atividade').insert({
                titulo,
                link,
                data_ocorrencia,
                descricao,
                legisladores,
                status
            })
            return res.status(201).send({ 
                mensagem: 'Atividade cadastrada!!',
                atividadeCriada: {
                    id,
                    titulo,
                    link,
                    data_ocorrencia,
                    descricao,
                    legisladores,
                    status
                }
            })
                
        } catch (error) {
            return res.status(500).send({ error: error })
        }

    },

    /**
     * Realiza a atualização de um cidadao 
     */
    async update(req, res, next){
        try {
            //Pega os dados da requisição
            const {titulo, link, data_ocorrencia, senha} = req.body
            
            //Faz a consulta ao Banco de dados
            const consulta = await connection('cidadao').where('id', id)
            //Verirfica se existe registro
            if (consulta.length<1) {
                return res.status(409).send({ mensagem: 'Cidadão não cadastrado' })
            }
            //Atualiza os dados do cidadão
            await connection('cidadao').where('id', id).update({
                titulo,
                link,
                data_ocorrencia,
                senha: hash
            })
            return res.status(200).send({ 
                mensagem: 'Cidadão Alterado!',
                cidadaoAlterado: {
                    id,
                    titulo,
                    link,
                    data_ocorrencia,
                }
            })
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    },

    /**
     * Realiza a exclusão de um cidadão 
     */
    async delete(req, res, next){
        try {
            //Pega os dados da requisição
            const id = req.body.id
            //Faz a consulta ao Banco de dados
            const consulta = await connection('cidadao').where('id', id)
            //Verirfica se existe registro
            if (consulta.length<1) {
                return res.status(401).send({ mensagem: 'Cidadão não cadastrado' })
            }
            //Apaga o registro do cidadão
            await connection('cidadao').where('id', id).del()
            return res.status(200).send({ 
                mensagem: 'Cidadão excluido!',
                cidadaoExcluido: {
                    id
                }
            })
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    },

    /**
     * Realiza a recuperação de um cidadão 
     */
    async get(req, res, next){
        try {
            //Pega os dados da requisição
            const id = req.body.id
            //Faz a consulta ao Banco de dados
            const consulta = await connection('cidadao').where('id', id).select('*')
            //Verirfica se existe registro
            if (consulta.length>0) {
                return res.json(consulta)
            }else{
                throw new Error('404 - Not Found')
            }   
        } catch (error) {
            return res.status(500).send({ mensagem: 'cidadao não cadastrado!' })
        }
    },

    /**
     * Realiza a listagem dos cidadaos 
     */
    async list(req, res, next){
        try {
            //Faz a consulta ao Banco de dados
            const cidadaos = await connection('cidadao').select('*')
            return res.status(200).send({ 
                cidadaos: cidadaos
            })
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    },
}