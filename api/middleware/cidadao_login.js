const connection = require('../database/connections');
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    /**
     *Realiza a validação do token passado no header da requisição
     *Deixa seguir o fluxo da rota caso o token seja válido
     *E retorna falha na autenticação caso inválido 
     */
    try {
        //Pega o Token no header da requisição
        const token = req.headers.authorization.split(' ')[1]
        //Verifica se o token é valido e retorna o escopo guardado no token
        //"segredo" é a chave privada única para a descriptografia dp token
        //A chave privada "segredo" deve ser alterada posteriormente para grantir maior segurança
        const decode = jwt.verify(token, 'segredo')

        const loggedUser = await connection('cidadao').where('cpf', decode.cpf);
        req.user = loggedUser[0];

        next()
    } catch (error) {
        return res.status(401).send({mensagem:'Falha na autenticação'})
    }
}