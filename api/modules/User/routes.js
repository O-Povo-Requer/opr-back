const express = require('express')

const routes = express.Router()

const Controller = require('./controller')

//Rota para cadastro de usuario
routes.post('/user', Controller.create)

/* 
    Rota de Login
    Se autenticado retorna um token disponibilizado por até 1 hora
*/
routes.post('/user/login', Controller.login)

//usuarios 
routes.put('/user', Controller.update)
routes.delete('/user', Controller.delete)
routes.post('/search/user', Controller.get)
routes.get('/users', Controller.list)

module.exports = routes
