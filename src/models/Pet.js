const { Model, DataTypes } = require('sequelize');

class Pet extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            raca: DataTypes.STRING,
            idade: DataTypes.INTEGER,
            humor: DataTypes.STRING,
            obs: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuarios' });
        this.hasMany(models.Agendamento, { foreignKey: 'pet_id', as: 'agendamentos' });
        this.belongsTo(models.File, { foreignKey: 'foto_id', as: 'fotos' });
    }
}

module.exports = Pet;