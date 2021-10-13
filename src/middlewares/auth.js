const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../config/authConfig');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: true, message: "Para acessar, favor fazer o login." });
    };

    const [, token ] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        req.usuarioId = decoded.id;

        next();
    }catch (error) {
        return res.status(401).json({ message: 'Token inválido'})
    }
}