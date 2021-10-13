const multer = require('multer');
const crypto = require('crypto');
const { extname, resolve } = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
        filename: (req, file, cb) => {
            crypto.randomBytes(10, (err, res) => {
                if (err) return cd(err);

                return cb(null, res.toString('hex') + extname(file.originalname))
            })
        },
    })
}