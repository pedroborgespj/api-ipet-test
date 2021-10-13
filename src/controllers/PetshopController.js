const Petshop = require('../models/Petshop');
const Regiao = require('../models/Regiao');
const { cadastro } = require('./UsuarioController');

module.exports = {
    async listarPetshopsRegiao(req, res) {
        const { regiao_id } = req.params;
        const petshops = await Petshop.findAll();

        const regiao = await Regiao.findByPk(regiao_id, {
            include: { 
                association: 'petshops',
                attributes: ['nome', 'email', 'contato', 'endereco', 'regiao_id', 'foto_id']
            }
        });

        return res.json(regiao.petshops);
    },

    async listarPetshopsDecrescente(req, res) {
        const petshops = await Petshop.findAll({
            order:[
                ['nome', 'DESC'],
            ],
            attributes: ['nome', 'email', 'contato', 'endereco', 'regiao_id', 'foto_id']
        });

        return res.json(petshops);
    },

    async listarPetshopsCrescente(req, res) {
        const petshops = await Petshop.findAll({
            order:[
                ['nome', 'ASC'],
            ],
            attributes: ['nome', 'email', 'contato', 'endereco', 'regiao_id', 'foto_id']
        });

        return res.json(petshops);
    },
    
    async listarPetshops(req, res) {
        const petshops = await Petshop.findAll();

        return res.json(petshops);
    },

    async cadastro(req, res) {
        const { nome, email, contato, endereco, regiao_id } = req.body;

        const petshopExist = await Petshop.findOne( { where: { email: req.body.email } })

        if(petshopExist){
            return res.status(400).json({ error: "Petshop já cadastrado." })
        }

        const petshop = await Petshop.create({ nome, email, contato, endereco, regiao_id });

        return res.json(petshop);
    }
}