const Agendamento = require('../models/Agendamento');
const Pet = require('../models/Pet');
const Servico_Petshop = require('../models/Servico_Petshop');

module.exports = {
    async index(req, res) {
        const agendamentos = await Agendamento.findAll();

        return res.json(agendamentos);
    },

    // /pets/:pet_id/petshops/:petshop_id/agendamentos
    async agendaPet(req, res) {
        const { pet_id } = req.params;
        const agendamentos = await Agendamento.findAll({
            where: {
                pet_id,
            },
            attributes: ['data'],
        });

        return res.json(agendamentos);
    },

    // /pets/:pet_id/petshops/:petshop_id/servicos/:servico_id/agendamentos
    async criarAgendamentoPet(req, res) {
        const { pet_id, petshop_id, servico_id } = req.params;

        const servico_petshop_id = await Servico_Petshop.findAll({
            where: {
                [Op.and]: [{ petshop_id }, { servico_id }]
            },
            attributes: ['id'],
        });
        servico_petshop_id = JSON.stringify(servico_petshop_id);
        servico_petshop_id = JSON.parse(servico_petshop_id);
        servico_petshop_id = servico_petshop_id[0].id;

        await Agendamento.update({ pet_id }, {
            where: {
                servico_petshop_id
            }
        })

        const data_agendamento = await Agendamento.findAll({
            where: {
                servico_petshop_id,
            },
            attributes: [ 'dh_agendamento' ],
        })

        const pet = await Pet.findAll({
            where: {
                pet_id,
            },
            attributes: ['nome', 'foto_id'],
        });

        const services_petshop = await Servico_Petshop.findAll({
            where: {
                petshop_id,
            },
            attributes: [
                'valor',
            ],
            include: [
                { association: 'servicos', attributes: ['nome'], },
                { association: 'petshops', attributes: ['nome'], },
            ]
        });

        return res.json(pet, services_petshop, data_agendamento);

    },

    async criarAgendaPetshopServico(req, res) {
        const { petshop_id, servico_id } = req.params;
        const { dh_agendamento } = req.body;

        const servico_petshop_id = await Servico_Petshop.findAll({
            where: {
                [Op.and]: [{ petshop_id }, { servico_id }]
            },
            attributes: ['id'],
        });
        servico_petshop_id = JSON.stringify(servico_petshop_id);
        servico_petshop_id = JSON.parse(servico_petshop_id);
        servico_petshop_id = servico_petshop_id[0].id;

        const agendamento = await Agendamento.create({ servico_petshop_id, dh_agendamento });

        return res.json(agendamento);
    }
}