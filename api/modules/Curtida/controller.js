const connection = require('../../database/connections')
const service = require('./service')
const jwt = require('jsonwebtoken')
const ErrorWithStatusCode = require('../../error/ErrorWithStatusCode')

module.exports = {
    async curtir(req, res, next){
        try {
            const {idRequerimento, cpf} = req.body
            const response = await service.curtir(idRequerimento, cpf);
            return res.status(200).send(response);
        } catch (e) {
            //concolse.log(e)
            if (e instanceof ErrorWithStatusCode) {
                return res.status(e.statusCode).send({ error: e.message })
            }
            return res.status(500).send({ error: e })
        }
    },

    async descurtir(req, res, next){
        try {
            const {idRequerimento} = req.body
            const response = await service.descurtir(idRequerimento, req.user);
            return res.status(200).send(response);
        } catch (e) {
            if (e instanceof ErrorWithStatusCode) {
                return res.status(e.statusCode).send({ error: e.message })
            }

            return res.status(500).send({ error: e })
        }
    },

    async curtidasByUserCpf(req, res, next){
        try {
            const { cpf } = req.body;
            const response = await service.curtidasByUserCpf(cpf);
            return res.status(200).send(response);
        } catch (e) {
            if (e instanceof ErrorWithStatusCode) {
                return res.status(e.statusCode).send({ error: e.message })
            }

            return res.status(500).send({ error: e })
        }
    },

    async curtidasByRequerimento(req, res, next){
        try {
            const { idRequerimento } = req.body
            const response = await service.curtidasByRequerimento(idRequerimento);
            return res.status(200).send(response);
        } catch (e) {
            if (e instanceof ErrorWithStatusCode) {
                return res.status(e.statusCode).send({ error: e.message })
            }

            return res.status(500).send({ error: e })
        }
    },

    async verificaCurtidaByRequerimentoAndUserCpf(req, res, next){
        try {
            const { idRequerimento } = req.body
            const response = await service.verificaCurtidaByRequerimentoAndUserCpf(idRequerimento, req.user);
            return res.status(200).send(response);
        } catch (e) {
            if (e instanceof ErrorWithStatusCode) {
                return res.status(e.statusCode).send({ error: e.message })
            }

            return res.status(500).send({ error: e })
        }
    },

}