'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('123456', salt);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@test.com',
        password: hash,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'John Doe',
        email: 'john@test.com',
        password: hash,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
