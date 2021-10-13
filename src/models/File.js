const { Model, DataTypes } = require('sequelize');

class File extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            path: DataTypes.STRING,
            url: {
                type: DataTypes.VIRTUAL,
                get(){
                    return `http://localhost:3333/files/${this.path}`;
                }
            }
        }, {
            sequelize,
        })
    }

}

module.exports = File;