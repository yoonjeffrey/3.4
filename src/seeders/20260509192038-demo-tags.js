'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tags', [
      {
        name: 'Urgent',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Personal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Work',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  }
};
