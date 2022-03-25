const express = require('express')

const routes = express.Router()

const Controller = require('./controller')

const login = require('../../middleware/cidadao_login')

routes.post('/curtida', login, Controller.curtir)
routes.delete('/curtida', login, Controller.descurtir)
routes.get('/curtidas_por_usuario', login, Controller.curtidasByUserCpf)
routes.get('/curtidas_por_requerimento', login, Controller.curtidasByRequerimento)
routes.get('/verifica_curtida', login, Controller.verificaCurtidaByRequerimentoAndUserCpf)

module.exports = routes
