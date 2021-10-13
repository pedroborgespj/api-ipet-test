const Yup = require('yup');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const config = require('../config/authConfig');
const bcrypt = require('bcryptjs');

module.exports = {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            senha: Yup.string().required(),
        })

        if( !(await schema.isValid(req.body)) ) {
            return res.status(400).json({ message: "Falha na validação." })
        }

        const { email, senha } = req.body;

        const userExist = await Usuario.findOne({ where: {email} });

        if(!userExist) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }
        
        if ( !(await bcrypt.compare(senha, userExist.senha_hash)) ) {
            return res.status(401).json({ message: 'Senha inválida'})
        }

        return res.status(200).json({
            usuario: {
                nome: userExist.nome,
                email: userExist.email,
            },
            token: jwt.sign( { id: userExist.id }, config.secret, {expiresIn: config.expireIn})
        });

    }
}