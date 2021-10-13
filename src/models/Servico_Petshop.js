const { Model, DataTypes } = require('sequelize');

class Servico_Petshop extends Model {
    static init(sequelize) {
        super.init({
            valor: DataTypes.FLOAT,
        }, {
            sequelize,
            freezeTableName: true,
            tableName: "servicos_petshops"
        })
    }

    static associate(models) {
        this.belongsTo(models.Servico, { foreignKey: 'servico_id', as: 'servicos' });
        this.belongsTo(models.Petshop, { foreignKey: 'petshop_id', as: 'petshops' });
        this.hasMany(models.Agendamento, { foreignKey: 'servico_petshop_id', as: 'agendamentos' });
    }
}

module.exports = Servico_Petshop;