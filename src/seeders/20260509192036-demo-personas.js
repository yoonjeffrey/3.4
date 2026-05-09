'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Personas', [
      {
        name: 'Alice',
        email: 'alice@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Personas', null, {});
  }
};
