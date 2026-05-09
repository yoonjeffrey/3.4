'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tareas', [
      {
        title: 'Comprar leche',
        description: 'Ir al supermercado a comprar leche',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Estudiar para el examen',
        description: 'Repasar los temas de Meta 3.4',
        status: 'in_progress',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tareas', null, {});
  }
};
