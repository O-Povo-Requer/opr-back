const express = require('express')

const routes = express.Router()

const controller = require('./controller')

const login = require('../../middleware/cidadao_login')

//Rota de Manifesto em alta
routes.get('/emalta', controller.emalta)

module.exports = routes
