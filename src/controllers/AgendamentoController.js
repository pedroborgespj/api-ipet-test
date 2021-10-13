const Agendamento = require('../models/Agendamento');

module.exports = {
    async index(req, res) {
        const agendamentos = await Agendamento.findAll();

        return res.json(agendamentos);
    },

    async store(req, res) {
        const { servico_petshop_id, pet_id, dh_agendamento } = req.body;

        const agendamento = await Agendamento.create({ servico_petshop_id, pet_id, dh_agendamento });

        return res.json(agendamento);
    }
}