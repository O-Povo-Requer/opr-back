const express = require('express')

const routes = express.Router()

const Controller = require('./controller')

const admin = require('../../middleware/admin')
const login = require('../../middleware/cidadao_login')

/**
 * Rotas que podem ser acessadas publicamente
 */




/**
 * Rotas que só podem ser acessadas estando logado
 */

//Rota para cadastro de um comentario
routes.post('/comentario',login, Controller.create)

routes.put('/comentario', login, Controller.update)
routes.delete('/comentario', login, Controller.delete)
routes.post('/search/comentario', login, Controller.get)
routes.post('/requerimento/comentarios', login, Controller.getByRequerimento)

/**
 * Rotas que só podem ser acessadas pelo administrador do sistema
 */
routes.get('/comentarios', admin, Controller.list)

module.exports = routes
