'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gamesname: {
        type: Sequelize.STRING
      },
      view: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      src: {
        allowNull: true,
        type: Sequelize.STRING
      },
      desc:{
        type: Sequelize.TEXT,
        allowNull: true
      },
      banner:{
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Games');
  }
};