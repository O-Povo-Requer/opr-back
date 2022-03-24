const express = require('express')

const routes = express.Router()

const Controller = require('./controller')

const login = require('../../middleware/cidadao_login')
const admin = require('../../middleware/admin')


/**
 * Rotas que só podem ser acessadas estando logado
 */
routes.post('/atividade', login, Controller.create)
routes.put('/atividade',login,Controller.update)
routes.delete('/atividade',login,Controller.delete)
routes.post('/search/atividade',login,Controller.get)
routes.post('/atividades-recentes',login,Controller.list_recent_activities)



/**
 * Rotas que só podem ser acessadas pelo administrador do sistema
 */
routes.get('/atividades',admin,Controller.list)

/** não sei se devia ter essas
 routes.post('/admin/atividade', admin, Controller.create)
 routes.put('/admin/atividade',admin,Controller.update)
 routes.delete('/admin/atividade',admin,Controller.delete)
*/

module.exports = routes
