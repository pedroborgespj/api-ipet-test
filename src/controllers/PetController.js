const { Op } = require('sequelize');
const Pet = require('../models/Pet');
const Usuario = require('../models/Usuario')

module.exports = {
    async deletarPetDono(req, res) {
        const { usuario_id } = req.params;
        const { pet_id } = req.params;

        await Pet.destroy({
            where: {
                [Op.and]: [{ usuario_id }, {id: pet_id}]
            }
        });

        return res.status(200).json( {message: 'Pet deletado com sucesso.'});
    },

    async editarInfoPetDono(req, res) {
        const { usuario_id } = req.params;
        const { pet_id } = req.params;
        const { nome, raca, idade, humor, obs } = req.body;

        await Pet.update({ nome, raca, idade, humor, obs }, {
            where: {
                [Op.and]: [{ usuario_id }, {id: pet_id}]
            }
        })

        return res.json({
            nome,
            raca,
            idade,
            humor,
            obs,
        });
    },
    
    async listarInfoPetDono(req, res) {
        const { usuario_id } = req.params;
        const { pet_id } = req.params;

        const pet = await Pet.findAll({
            where: {
                [Op.and]: [{ usuario_id }, {id: pet_id}]
            },
            attributes: ['nome', 'raca', 'idade', 'humor', 'obs', 'usuario_id', 'foto_id'],
        });

        return res.json(pet);
    },
    
    async listarPetsDono(req, res) {
        const { usuario_id } = req.params;

        const user = await Usuario.findByPk(usuario_id, {
            include: { 
                association: 'pets', 
                attributes: ['nome', 'foto_id']
            }
        });

        return res.json(user.pets);
    },

    async cadastro(req, res) {
        const { usuario_id } = req.params;
        const { nome, raca, idade, humor, obs } = req.body;

        const user = await Usuario.findByPk(usuario_id);

        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }
        
        const pet = await Pet.create({ nome, raca, idade, humor, obs, usuario_id });

        return res.json(pet);
    }
}