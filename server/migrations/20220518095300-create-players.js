'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        unique:true
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique:true
      },
      birth: {
        allowNull: true,
        type: Sequelize.STRING
      },
      country: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bio: {
        allowNull: true,
        type: Sequelize.STRING
      },
      src: {
        allowNull: true,
        defaultValue:"https://res.cloudinary.com/alternate-cloud/image/upload/v1658843311/letitimages/d8e9sqsek4saf4ikv21j.jpg",
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Players');
  }
};