'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PersonaTareas', [
      {
        PersonaId: 1, // Alice
        TareaId: 1,   // Comprar leche
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        PersonaId: 2, // Bob
        TareaId: 2,   // Estudiar
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PersonaTareas', null, {});
  }
};
