const Petshop = require('../models/Petshop');
const Servico = require('../models/Servico');
const Servico_Petshop = require('../models/Servico_Petshop');

module.exports = {
    async petshopsServicos(req, res) {
        const { servico_id } = req.params;

        const petshops = await Servico_Petshop.findAll({
            where: {
                servico_id: servico_id,
            },
            attributes: ['valor'],
            include: { 
                association: 'petshops',
                attributes: ['nome', 'email', 'contato', 'endereco', 'regiao_id', 'foto_id']
            }
        });

        return res.json(petshops);
    },
    
    async index(req, res) {
        const services_petshops = await Servico_Petshop.findAll();

        return res.json(services_petshops);
    },

    async listarServicosPetshop(req, res) {
        const { petshop_id } = req.params;

        const services_petshop = await Servico_Petshop.findAll({
            where: {
                petshop_id,
            },
            attributes: [
                'valor',
            ],
            include: [
                { association: 'servicos', attributes: ['nome'], },
                { association: 'petshops', attributes: ['endereco'], },
            ]
        });

        return res.json(services_petshop);
    },

    async cadastroServicosPetshop(req, res) {
        const { petshop_id } = req.params;
        const { servico_nome, valor } = req.body;

        let servico_id = await Servico.findAll({
            where: {
                nome: servico_nome
            },
            attributes: ['id']
        });
        servico_id = JSON.stringify(servico_id);
        servico_id = JSON.parse(servico_id);
        servico_id = servico_id[0].id;

        const service_petshop = await Servico_Petshop.create({ servico_id, petshop_id, valor });

        return res.json(service_petshop);
    }
}