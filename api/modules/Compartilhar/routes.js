const express = require('express')

const routes = express.Router()

const Controller = require('./controller')

const login = require('../../middleware/cidadao_login')

routes.post('/compartilhar', login, Controller.compartilhar)
routes.delete('/compartilhar', login, Controller.descompartilhar)

module.exports = routes
