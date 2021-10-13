const { Model, DataTypes } = require('sequelize');

class Petshop extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            contato: DataTypes.STRING,
            endereco: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Regiao, { foreignKey: 'regiao_id', as: 'regioes' });
        this.hasMany(models.Servico_Petshop, { foreignKey: 'petshop_id', as: 'petshops_servicos' });
        this.belongsTo(models.File, { foreignKey: 'foto_id', as: 'fotos' });
    }
}

module.exports = Petshop;