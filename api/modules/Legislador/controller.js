const connection = require('../../database/connections')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {

    /**
     * Realiza o login do legislador e retorna o token em caso de sucesso
     */
    async login(req, res, next){
        try {
            //Pega os dados da requisição
            const {cpf, senha} = req.body
            //Faz a consulta ao Banco de dados
            const consulta = await connection('legislador').where('cpf', cpf)
            //Verirfica se existe registro
            if (consulta.length<1) {
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            }
            //Faz a descriptografia da senha realiza a autenticação
            bcrypt.compare(senha, consulta[0].senha, (error, result) => {
                //Tratamento de erro
                if (error) {
                    return res.status(401).send({ mensagem: 'Falha na autenticação' })
                }
                //Em caso de sucesso
                if (result) {
                    //Cria um escopo a ser guardado no token
                    const token = jwt.sign({
                        cpf
                    }, 
                    //Chave secreta para descriptografia
                    //Deve ser alterada posteriormente para maior segurança
                    'segredo', 
                    //Tempo para o token expirar
                    {
                        expiresIn: "1h"
                    })
                    return res.status(200).send(token)
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            })
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    },

    /**
     * Realiza o cadastro de legislador 
     */
    async create(req, res, next){
        try {
            //Pega os dados da requisição
            const {cpf, nome, email, cidade, senha, partido} = req.body
            //Realiza a criptografia da senha
            //O 10 é um salto, incremente 10 caracteres aleatórios na senha para garantir segurança
            bcrypt.hash(senha, 10, async (errBcrypt, hash) => {
                if (errBcrypt) {
                    return res.status(500).send({ error: errBcrypt })
                }
                //Faz a consulta ao Banco de dados
                const consulta = await connection('legislador').where('cpf', cpf)
                //Verirfica se existe registro
                if (consulta.length>0) {
                    return res.status(409).send({ mensagem: 'Legislador já cadastrado' })
                }
                //Cadastra o legislador no banco de dados
                await connection('legislador').insert({
                    cpf,
                    nome,
                    email,
                    cidade,
                    partido,
                    senha: hash
                })
                return res.status(201).send({ 
                    mensagem: 'Legislador cadastrado!',
                    legisladorCriado: {
                        cpf,
                        nome,
                        email,
                        cidade,
                        partido
                    }
                })
            })
        } catch (error) {
            return res.status(500).send({ error: error })
        }

    },

    /**
     * Realiza a atualização de um legislador 
     */
    async update(req, res, next){
        try {
            //Pega os dados da requisição
            const {cpf, nome, email, cidade, senha, partido} = req.body
            //Realiza a criptografia da senha
            //O 10 é um salto, incremente 10 caracteres aleatórios na senha para garantir segurança
            bcrypt.hash(senha, 10, async (errBcrypt, hash) => {
                if (errBcrypt) {
                    return res.status(500).send({ error: errBcrypt })
                }
                //Faz a consulta ao Banco de dados
                const consulta = await connection('legislador').where('cpf', cpf)
                //Verirfica se existe registro
                if (consulta.length<1) {
                    return res.status(409).send({ mensagem: 'Legislador não cadastrado' })
                }
                //Atualiza os dados do legislador
                await connection('legislador').where('cpf', cpf).update({
                    nome,
                    email,
                    cidade,
                    partido,
                    senha: hash
                })
                return res.status(200).send({ 
                    mensagem: 'Legislador Alterado!',
                    legisladorAlterado: {
                        cpf,
                        nome,
                        email,
                        cidade,
                        partido
                    }
                })
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
            const cpf = req.body.cpf
            //Faz a consulta ao Banco de dados
            const consulta = await connection('legislador').where('cpf', cpf)
            //Verirfica se existe registro
            if (consulta.length<1) {
                return res.status(401).send({ mensagem: 'Legislador não cadastrado' })
            }
            //Apaga o registro do legislador
            await connection('legislador').where('cpf', cpf).del()
            return res.status(200).send({ 
                mensagem: 'Legislador excluido!',
                legisladorExcluido: {
                    cpf
                }
            })
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    },

    /**
     * Realiza a recuperação de um legislador 
     */
    async get(req, res, next){
        try {
            //Pega os dados da requisição
            const cpf = req.body.cpf
            //Faz a consulta ao Banco de dados
            const consulta = await connection('legislador').where('cpf', cpf).select('*')
            //Verirfica se existe registro
            if (consulta.length>0) {
                return res.json(consulta)
            }else{
                throw new Error('404 - Not Found')
            }   
        } catch (error) {
            return res.status(500).send({ mensagem: 'legislador não cadastrado!' })
        }
    },

    /**
     * Realiza a listagem dos legisladores 
     */
    async list(req, res, next){
        try {
            //Faz a consulta ao Banco de dados
            const legisladores = await connection('legislador').select('*')
            return res.status(200).send({ 
                legisladores: legisladores
            })
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    },
}