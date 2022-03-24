const express = require('express')

const routes = express.Router()

const Controller = require('./controller')

/* 
    Rota de Login
    Se autenticado retorna um token disponibilizado por até 1 hora
*/
routes.post('/login', Controller.login)

module.exports = routes
