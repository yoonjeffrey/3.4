'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TareaTags', [
      {
        TareaId: 1, // Comprar leche
        TagId: 2,   // Personal
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        TareaId: 2, // Estudiar
        TagId: 1,   // Urgent
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TareaTags', null, {});
  }
};
