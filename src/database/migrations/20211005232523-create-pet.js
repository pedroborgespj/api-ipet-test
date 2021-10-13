'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pets', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      raca: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      humor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      obs: {
        type: Sequelize.STRING(500),
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
      foto_id: {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
        unique: true,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pets');
  }
};
