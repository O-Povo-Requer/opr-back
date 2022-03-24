const express = require('express');

const routes = express.Router();

const Controller = require('./controller')

const admin = require('../../middleware/admin')
const login = require('../../middleware/cidadao_login')

routes.post('/requerimento/novo', login, Controller.create);
routes.put('/requerimento/edit/:id', login, Controller.update);
routes.get('/requerimentos', login, Controller.getAll);
routes.get('/requerimento/:id', login, Controller.get);
routes.delete('/requerimento/:id', login, Controller.delete);

//Rota de Manifesto em alta
routes.get('/emalta', Controller.emalta)

module.exports = routes;
