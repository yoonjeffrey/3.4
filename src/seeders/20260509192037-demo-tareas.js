'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tareas', [
      {
        title: 'Comprar leche',
        description: 'Ir al supermercado a comprar leche',
        status: 'pending',
        userId: 2, // John Doe
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Estudiar para el examen',
        description: 'Repasar los temas de Meta 3.4',
        status: 'in_progress',
        userId: 2, // John Doe
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tareas', null, {});
  }
};
