const { Model, DataTypes } = require('sequelize');

class Regiao extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
        }, {
            sequelize,
            freezeTableName: true,
            tableName: "regioes"
        })
    }

    static associate(models) {
        this.hasMany(models.Petshop, { foreignKey: 'regiao_id', as: 'petshops' });
    }
}

module.exports = Regiao;