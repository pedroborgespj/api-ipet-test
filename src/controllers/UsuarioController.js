const Yup = require('yup');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

module.exports = {
    async update(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string(),
            email: Yup.string().email(),
            antigaSenha: Yup.string().min(6),
            senha: Yup.string().min(6).when(
                'antigaSenha', (antigaSenha, field) => antigaSenha ? field.required() : field
            ),
            confirmarSenha: Yup.string().when( 'senha', (senha, field) => senha ? field.required().oneOf([Yup.ref('senha')]) : field),
        })

        if( !(await schema.isValid(req.body)) ) {
            return res.status(400).json({ message: "Falha na validação." })
        }

        const { email, antigaSenha } = req.body;

        const usuario = await Usuario.findByPk(req.usuarioId);

        const userExist = await Usuario.findOne( { where: { email } });

        if ( email && email !== usuario.email) {
            if(userExist){
                return res.status(400).json({ error: "Usuário já cadastrado." })
            }
        }

        if ( antigaSenha && !(await bcrypt.compare(antigaSenha, userExist.senha_hash)) ) {
            return res.status(401).json({ message: 'Senha inválida'})
        }

        const { id, nome } = await usuario.update(req.body);

        return res.json({ 
            id,
            nome,
            email,
        })
    },

    async index(req, res) {
        const users = await Usuario.findAll();

        return res.json(users);
    },

    async cadastro(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().email().required(),
            senha: Yup.string().required().min(6),
        })

        if( !(await schema.isValid(req.body)) ) {
            return res.status(400).json({ message: "Falha na validação." })
        }

        const userExist = await Usuario.findOne( { where: { email: req.body.email } })

        if(userExist){
            return res.status(400).json({ error: "Usuário já cadastrado." })
        }

        const { nome, email, senha } = req.body;

        const user = await Usuario.create({ nome, email, senha });

        return res.json(user);
    }
}