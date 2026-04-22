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
        image: 'bottle_black_lime_06.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tumblers',
        description: 'Vasos térmicos con tapa para llevar',
        image: 'tumbler_black_multicolor_10.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Botellas Deportivas',
        description: 'Botellas ideales para actividades físicas',
        image: 'bottle_white_04.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Termos Infantiles',
        description: 'Diseños divertidos para los más pequeños',
        image: 'tumbler_pink_lime_05.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Accesorios',
        description: 'Tapas, popotes y otros accesorios',
        image: 'tumbler_pink_03.png',
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
