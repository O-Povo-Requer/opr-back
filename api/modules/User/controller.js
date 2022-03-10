const connection = require('../../database/connections')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {

    /**
     * Realiza o login do user e retorna o token em caso de sucesso
     */
    async login(req, res, next){
        try {
            //Pega os dados da requisição
            const {cpf, senha} = req.body
            //Faz a consulta ao Banco de dados
            const consulta = await connection('user').where('cpf', cpf)
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
     * Realiza o cadastro de user 
     */
    async create(req, res, next){
        try {
            //Pega os dados da requisição
            const {cpf, nome, email, telefone, senha} = req.body
            //Realiza a criptografia da senha
            //O 10 é um salto, incremente 10 caracteres aleatórios na senha para garantir segurança
            bcrypt.hash(senha, 10, async (errBcrypt, hash) => {
                if (errBcrypt) {
                    return res.status(500).send({ error: errBcrypt })
                }
                //Faz a consulta ao Banco de dados
                const consulta = await connection('user').where('cpf', cpf)
                //Verirfica se existe registro
                if (consulta.length>0) {
                    return res.status(409).send({ mensagem: 'User já cadastrado' })
                }
                //Cadastra o comprador pf no banco de dados
                await connection('user').insert({
                    cpf,
                    nome,
                    email,
                    telefone,
                    senha: hash
                })
                return res.status(201).send({ 
                    mensagem: 'User cadastrado!',
                    userCriado: {
                        cpf,
                        nome,
                        email,
                        telefone,
                    }
                })
            })
        } catch (error) {
            return res.status(500).send({ error: error })
        }

    },

    /**
     * Realiza a atualização de um user 
     */
    async update(req, res, next){
        try {
            //Pega os dados da requisição
            const {cpf, nome, email, telefone, senha} = req.body
            //Realiza a criptografia da senha
            //O 10 é um salto, incremente 10 caracteres aleatórios na senha para garantir segurança
            bcrypt.hash(senha, 10, async (errBcrypt, hash) => {
                if (errBcrypt) {
                    return res.status(500).send({ error: errBcrypt })
                }
                //Faz a consulta ao Banco de dados
                const consulta = await connection('user').where('cpf', cpf)
                //Verirfica se existe registro
                if (consulta.length<1) {
                    return res.status(409).send({ mensagem: 'User não cadastrado' })
                }
                //Atualiza os dados do comprador pf
                await connection('user').where('cpf', cpf).update({
                    nome,
                    email,
                    telefone,
                    senha: hash
                })
                return res.status(200).send({ 
                    mensagem: 'User Alterado!',
                    userAlterado: {
                        cpf,
                        nome,
                        email,
                        telefone,
                    }
                })
            })
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    },

    /**
     * Realiza a exclusão de um comprador 
     */
    async delete(req, res, next){
        try {
            //Pega os dados da requisição
            const cpf = req.body.cpf
            //Faz a consulta ao Banco de dados
            const consulta = await connection('user').where('cpf', cpf)
            //Verirfica se existe registro
            if (consulta.length<1) {
                return res.status(401).send({ mensagem: 'User não cadastrado' })
            }
            //Apaga o registro do comprador pf
            await connection('user').where('cpf', cpf).del()
            return res.status(200).send({ 
                mensagem: 'User excluido!',
                userExcluido: {
                    cpf
                }
            })
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    },

    /**
     * Realiza a recuperação de um comprador 
     */
    async get(req, res, next){
        try {
            //Pega os dados da requisição
            const cpf = req.body.cpf
            //Faz a consulta ao Banco de dados
            const consulta = await connection('user').where('cpf', cpf).select('*')
            //Verirfica se existe registro
            if (consulta.length>0) {
                return res.json(consulta)
            }else{
                throw new Error('404 - Not Found')
            }   
        } catch (error) {
            return res.status(500).send({ mensagem: 'User não cadastrado!' })
        }
    },

    /**
     * Realiza a listagem dos users 
     */
    async list(req, res, next){
        try {
            //Faz a consulta ao Banco de dados
            const users = await connection('user').select('*')
            return res.status(201).send({ 
                users: users
            })
        } catch (error) {
            return res.status(500).send({ error: error })
        }
    },
}