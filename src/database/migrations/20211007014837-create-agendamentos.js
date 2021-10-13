'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('agendamentos', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      servico_petshop_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'servicos_petshops', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      pet_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'pets', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      dh_agendamento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      canceled_at: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('agendamentos');

  }
};
