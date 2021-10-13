const { Model, DataTypes } = require('sequelize');

class Servico extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Servico_Petshop, { foreignKey: 'servico_id', as: 'servicos_petshops' });
    }
}

module.exports = Servico;