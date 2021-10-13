const File = require('../models/File')

module.exports = {
    async store( req, res ) {
        const { originalname: nome, filename: path } = req.file;

        const file = await File.create({
            nome,
            path,
        })

        return res.json(file)
    }
}