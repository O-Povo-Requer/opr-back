const express = require('express');

const routes = express.Router();

const Controller = require('./controller')

const admin = require('../../middleware/admin')
const login = require('../../middleware/cidadao_login')

routes.post('/requerimento/novo', login, Controller.create);

module.exports = routes;