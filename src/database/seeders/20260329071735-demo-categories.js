'use strict';

/*@type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Termos clásicos',
        description: 'Termos tradicionales para bebidas calientes o frías',
        image: 'categoria-clasicos.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tumblers',
        description: 'Vasos térmicos con tapa para llevar',
        image: 'categoria-tumblers.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Botellas Deportivas',
        description: 'Botellas ideales para actividades físicas',
        image: 'categoria-deportivas.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Termos Infantiles',
        description: 'Diseños divertidos para los más pequeños',
        image: 'categoria-infantiles.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Accesorios',
        description: 'Tapas, popotes y otros accesorios',
        image: 'categoria-accesorios.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('categories', null, {});
  }
};
