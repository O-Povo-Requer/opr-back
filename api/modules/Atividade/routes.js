const express = require('express')

const routes = express.Router()

const Controller = require('./controller')

const login = require('../../middleware/cidadao_login')





/**
 * Rotas que só podem ser acessadas estando logado
 */
routes.post('/atividade', login, Controller.create)
routes.put('/atividade',login,Controller.update)

module.exports = routes
