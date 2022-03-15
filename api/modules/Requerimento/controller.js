const service = require('./service');

module.exports = {
    async create(req, res, next) {
        try {
            const { body } = req;
            const response = await service.create_requerimento(body, req.user);
            return res.status(201).send(response);
        }catch (err) {
            return res.status(400).send(err.message);
        }
    }
}
