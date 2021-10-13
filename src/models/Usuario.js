const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.VIRTUAL,
            senha_hash: DataTypes.STRING,
        }, {
            sequelize,
            hooks: {
                beforeSave: async usuario => {
                    if (usuario.senha) {
                        usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);
                    }
                }
            }
        })
    }

    static associate(models) {
        this.hasMany(models.Pet, { foreignKey: 'usuario_id', as: 'pets' });
        this.belongsTo(models.File, { foreignKey: 'foto_id', as: 'fotos' });
    }

}

module.exports = Usuario;