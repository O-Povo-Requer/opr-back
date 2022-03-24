const express = require('express')

const routes = express.Router()

const Controller = require('./controller')

const admin = require('../../middleware/admin')
const login = require('../../middleware/cidadao_login')

/**
 * Rotas que podem ser acessadas publicamente
 */

//Rota para cadastro de cidadao
routes.post('/cidadao', Controller.create)

/**
 * Rotas que só podem ser acessadas estando logado
 */
routes.put('/cidadao', login, Controller.update)
routes.delete('/cidadao', login, Controller.delete)

/**
 * Rotas que só podem ser acessadas pelo administrador do sistema
 */
routes.post('/search/cidadao', admin, Controller.get)
routes.get('/cidadaos', admin, Controller.list)

module.exports = routes
