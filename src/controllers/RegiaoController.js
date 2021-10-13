const Regiao = require('../models/Regiao');

module.exports = {
    async index(req, res) {
        const regioes = await Regiao.findAll();

        return res.json(regioes);
    },

    async store(req, res) {
        const { nome } = req.body;

        const regiao = await Regiao.create({ nome });

        return res.json(regiao);
    }
}