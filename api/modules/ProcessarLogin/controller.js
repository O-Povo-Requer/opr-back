const connection = require('../../database/connections')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {

    /**
     * Realiza o login e retorna o token em caso de sucesso
     */
    async login(req, res, next){
        try {
            //Pega os dados da requisição
            const {cpf, senha} = req.body
            //console.log(cpf +" + "+ senha)
            //Faz a consulta ao Banco de dados
            const legislador = await connection('legislador').where('cpf', cpf)
            //Verirfica se existe registro
            if (legislador.length<1) {
                const cidadao = await connection('cidadao').where('cpf', cpf)
                //console.log(cidadao)
                if (cidadao.length<1) {
                    return res.status(401).send({ mensagem: 'Falha na autenticação' })
                }else{
                    //Faz a descriptografia da senha realiza a autenticação
                    bcrypt.compare(senha, cidadao[0].senha, (error, result) => {
                        //Tratamento de erro
                        if (error) {
                            return res.status(401).send({ mensagem: 'Falha na autenticação' })
                        }
                        //Em caso de sucesso
                        if (result) {
                            //Cria um escopo a ser guardado no token
                            const token = jwt.sign({
                                cpf,
                                tipo_de_usuario: "cidadao"
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
                }
            }else{
                //Faz a descriptografia da senha realiza a autenticação
                bcrypt.compare(senha, legislador[0].senha, (error, result) => {
                    //Tratamento de erro
                    if (error) {
                        return res.status(401).send({ mensagem: 'Falha na autenticação' })
                    }
                    //Em caso de sucesso
                    if (result) {
                        //Cria um escopo a ser guardado no token
                        const token = jwt.sign({
                            cpf,
                            tipo_de_usuario: "legislador"
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
            }
        } catch (error) {
            //console.log(error)
            return res.status(500).send({ error: error })
        }
    }
}