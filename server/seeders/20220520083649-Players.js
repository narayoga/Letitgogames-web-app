'use strict';
const { hashPassword } = require("../middlewares/passwordHandler");

module.exports = {
  async up (queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Players',[
     {
       id: 1,
       username: 'asa',
       password: await hashPassword('123123123'),
       email: 'asa@gmail.com',
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       id: 2,
       username: 'asu',
       password: await hashPassword('123123123'),
       email: 'asa@su.com',
       createdAt: new Date(),
       updatedAt: new Date(),
     },
   ])
  },

  async down (queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Players')
  }
};
