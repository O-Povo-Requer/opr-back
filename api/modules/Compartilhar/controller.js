const connection = require('../../database/connections')
const service = require('./service')
const jwt = require('jsonwebtoken')
const ErrorWithStatusCode = require('../../error/ErrorWithStatusCode')

module.exports = {
    async compartilhar(req, res, next){
        try {
            const {idRequerimento} = req.body
            const response = await service.compartilhar(idRequerimento, req.user);
            return res.status(201).send(response);
        } catch (e) {
            if (e instanceof ErrorWithStatusCode) {
                return res.status(e.statusCode).send({ error: e.message })
            }
            return res.status(500).send({ error: e })
        }
    },

    async descompartilhar(req, res, next){
        try {
            const {idRequerimento} = req.body
            const response = await service.descompartilhar(idRequerimento, req.user);
            return res.status(200).send(response);
        } catch (e) {
            if (e instanceof ErrorWithStatusCode) {
                return res.status(e.statusCode).send({ error: e.message })
            }
            return res.status(500).send({ error: e })
        }
    }

}