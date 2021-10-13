'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('servicos_petshops', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      servico_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'servicos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      petshop_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'petshops', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      valor: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('servicos_petshops');

  }
};
