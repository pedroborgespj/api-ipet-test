const Servico = require('../models/Servico');

module.exports = {
    async index(req, res) {
        const services = await Servico.findAll();

        return res.json(services);
    },

    async store(req, res) {
        const { nome } = req.body;

        const service = await Servico.create({ nome });

        return res.json(service);
    }
}