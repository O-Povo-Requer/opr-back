/**
     *Realiza a validação do token passado no header da requisição
     *Esta validação é para autenticar o administrador do sistema
     *Deixa seguir o fluxo da rota caso o token seja válido
     *E retorna falha na autenticação caso inválido 
     */
module.exports = (req, res, next) => {
    try {
        //Pega o Token no header da requisição
        const token = req.headers.authorization.split(' ')[1]
        //Verifica se o token é valido e retorna o escopo guardado no token
        //"123" é o token do administrado
        //Este token deve ser alterado posteriormente para grantir maior segurança
        if (token=="123") {
            next()    
        }else{
            throw 401
        }
        
    } catch (error) {
        return res.status(401).send({mensagem:'Falha na autenticação'})
    }
}