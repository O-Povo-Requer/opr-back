const service = require('./service');

module.exports = {
    async create(req, res, next) {
        try {
            const { body } = req;
            const response = await service.create_requerimento(body, req.user);
            return res.status(201).send(response);
        }catch (err) {
            console.log(err)
            return res.status(400).send(err.message);
        }
    },

    async update(req, res, next) {
        try {
            const { body, params } = req;
            const response = await service.update_requerimento(body, req.user, params.id);
            return res.status(204).send(response);
        }catch (err) {
            return res.status(400).send(err.message);
        }
    },

    async get(req, res, next) {
        try {
            const { id } = req.params;
            const response = await service.visualiza_requerimento(id);
            return res.status(200).send(response);
        }catch (err) {
            return res.status(400).send(err.message);
        }
    },

    async getAll(req, res, next) {
        try {
            const { value } = req.query;
            const response = await service.lista_requerimento(value);
            return res.status(200).send(response);
        }catch (err) {
            return res.status(400).send(err.message);
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await service.delete_requerimento(id, req.user);
            return res.sendStatus(200);
        }catch (err) {
            return res.status(400).send(err.message);
        }
    }
}
