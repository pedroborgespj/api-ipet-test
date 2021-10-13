const { Model, DataTypes } = require('sequelize');

class Agendamento extends Model {
    static init(sequelize) {
        super.init({
            dh_agendamento: DataTypes.DATE,
            canceled_at: DataTypes.DATE,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Servico_Petshop, { foreignKey: 'servico_petshop_id', as: 'servico_petshop' });
        this.belongsTo(models.Pet, { foreignKey: 'pet_id', as: 'pet' });
    }
}

module.exports = Agendamento;