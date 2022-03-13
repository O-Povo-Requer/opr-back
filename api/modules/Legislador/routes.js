const express = require('express')

const routes = express.Router()

const Controller = require('./controller')

const admin = require('../../middleware/admin')
const login = require('../../middleware/legislador_login')

/**
 * Rotas que podem ser acessadas publicamente
 */

//Rota para cadastro de legislador
routes.post('/legislador', Controller.create)
/* 
    Rota de Login
    Se autenticado retorna um token disponibilizado por até 1 hora
*/
routes.post('/legislador/login', Controller.login)




/**
 * Rotas que só podem ser acessadas estando logado
 */
routes.put('/legislador', login, Controller.update)
routes.delete('/legislador', login, Controller.delete)

/**
 * Rotas que só podem ser acessadas pelo administrador do sistema
 */
routes.post('/search/legislador', admin, Controller.get)
routes.get('/legisladores', admin, Controller.list)

module.exports = routes
