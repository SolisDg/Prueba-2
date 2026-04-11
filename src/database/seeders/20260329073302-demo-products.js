'use strict';
/*@type {import('sequelize-cli').Migration}*/
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('products', [
      {
        name: 'Termo Rosa Brillante',
        description: 'Hermoso termo de acero inoxidable en color rosa brillante. Mantiene bebidas calientes por 12 horas y frías por 24 horas.',
        price: 349.99,
        image: 'termo-rosa.pgn',
        stock: 50,
        color: 'Rosa',
        capacity: '500ml',
        featured: true,
        active: true,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tumbler Menta',
        description: 'Tumbler con tapa de bambú y popote reutilizable. Perfecto para smoothies y bebidas frías.',
        price: 279.99,
        image: 'tumbler-menta.png',
        stock: 30,
        color: 'Menta',
        capacity: '750ml',
        featured: true,
        active: true,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Botella Deportiva Pro',
        description: 'Botella deportiva con boquilla especial anti-derrames. Ideal para el gimnasio.',
        price: 199.99,
        image: 'botella-deportiva.png',
        stock: 100,
        color: 'Negro',
        capacity: '1L',
        featured: false,
        active: true,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Termo Unicornio Kids',
        description: 'Termo infantil con diseño de unicornio. Incluye funda protectora y correa.',
        price: 249.99,
        image: 'termo-unicornio.png',
        stock: 25,
        color: 'Multicolor',
        capacity: '350ml',
        featured: true,
        active: true,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Set de Popotes Reutilizables',
        description: 'Set de 4 popotes de acero inoxidable con cepillo limpiador.',
        price: 89.99,
        image: 'popotes-set.png',
        stock: 200,
        color: 'Plateado',
        capacity: null,
        featured: false,
        active: true,
        categoryId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('products', null, {});
  }
};
