'use strict';
/*@type {import('sequelize-cli').Migration}*/
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      `SELECT id, name FROM categories;`
    );
    const categoryRows = categories[0];
    
    const getCategoryId = (name) => {
      const category = categoryRows.find(c => c.name === name);
      return category ? category.id : null;
    };

    await queryInterface.bulkInsert('products', [
      {
        name: 'Termo Rosa Brillante',
        description: 'Hermoso termo de acero inoxidable en color rosa brillante. Mantiene bebidas calientes por 12 horas y frías por 24 horas.',
        price: 349.99,
        image: 'tumbler_pink_03.jpg',
        stock: 50,
        color: 'Rosa',
        capacity: '500ml',
        featured: true,
        active: true,
        categoryId: getCategoryId('Termos clásicos'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tumbler Menta',
        description: 'Tumbler con tapa de bambú y popote reutilizable. Perfecto para smoothies y bebidas frías.',
        price: 279.99,
        image: 'tumbler_white_pink_ombre_09.jpg',
        stock: 30,
        color: 'Menta',
        capacity: '750ml',
        featured: true,
        active: true,
        categoryId: getCategoryId('Tumblers'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Botella Deportiva Pro',
        description: 'Botella deportiva con boquilla especial anti-derrames. Ideal para el gimnasio.',
        price: 199.99,
        image: 'bottle_black_lime_06.jpg',
        stock: 100,
        color: 'Negro',
        capacity: '1L',
        featured: false,
        active: true,
        categoryId: getCategoryId('Botellas Deportivas'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Termo Unicornio Kids',
        description: 'Termo infantil con diseño de unicornio. Incluye funda protectora y correa.',
        price: 249.99,
        image: 'tumbler_pink_lime_05.jpg',
        stock: 25,
        color: 'Multicolor',
        capacity: '350ml',
        featured: true,
        active: true,
        categoryId: getCategoryId('Termos Infantiles'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Set de Popotes Reutilizables',
        description: 'Set de 4 popotes de acero inoxidable con cepillo limpiador.',
        price: 89.99,
        image: 'bottle_white_04.jpg',
        stock: 200,
        color: 'Plateado',
        capacity: null,
        featured: false,
        active: true,
        categoryId: getCategoryId('Accesorios'),
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
