const { Op } = require('sequelize');
const Agendamento = require('../models/Agendamento');
const Servico_Petshop = require('../models/Servico_Petshop');
const Pet = require('../models/Pet');

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
            attributes: ['dh_agendamento'],
        });

        return res.json(agendamentos);
    },

    // /pets/:pet_id/petshops/:petshop_id/servicos/:servico_id/agendamentos
    async criarAgendamentoPet(req, res) {
        const { pet_id, petshop_id, servico_id } = req.params;
        const { dh_agendamento } = req.body;

        let servico_petshop_id = await Servico_Petshop.findAll({
            where: {
                [Op.and]: [{ petshop_id }, { servico_id }]
            },
            attributes: ['id'],
        });
        servico_petshop_id = JSON.stringify(servico_petshop_id);
        servico_petshop_id = JSON.parse(servico_petshop_id);
        servico_petshop_id = servico_petshop_id[0].id;

        let agendamento_id = await Agendamento.findAll({
            where: {
                [Op.and]: [{ servico_petshop_id }, { dh_agendamento }]
            },
            attributes: ['id'],
        });
        agendamento_id = JSON.stringify(agendamento_id);
        agendamento_id = JSON.parse(agendamento_id);
        agendamento_id = agendamento_id[0].id;
    
        await Agendamento.update({ pet_id }, {
            where: {
                id: agendamento_id,
            }
        })

        const data_agendamento = await Agendamento.findAll({
            where: {
                id: agendamento_id,
            },
            attributes: [ 'dh_agendamento' ],
        })

        const pet = await Pet.findAll({
            where: {
                id: pet_id,
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
                { association: 'servicos', attributes: ['nome'], where: {id: servico_id}, },
                { association: 'petshops', attributes: ['nome'], },
            ]
        });

        return res.json({ 
            data_agendamento, pet, services_petshop
        });

    },

    async criarAgendaPetshopServico(req, res) {
        const { petshop_id, servico_id } = req.params;
        const { dh_agendamento } = req.body;

        let servico_petshop_id = await Servico_Petshop.findAll({
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