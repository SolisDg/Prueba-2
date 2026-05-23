const { Category, Product } = require('../../database/models');

const categoriesApiController = {
    list: async (req, res) => {
        try {
            const categories = await Category.findAll({
                include: [{ model: Product, as: 'products', attributes: ['id'] }]
            });

            const baseUrl = `${req.protocol}://${req.get('host')}/api/categories`;

            const response = {
                status: 'success',
                count: categories.length,
                categories: categories.map(category => ({
                    id: category.id,
                    name: category.name,
                    productCount: category.products ? category.products.length : 0,
                    detail: `${baseUrl}/${category.id}`
                }))
            };
            res.status(200).json(response);

        } catch (error) {
            console.error('Error al listar categorías:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error interno del servidor'
            });
        }
    },
    detail: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id, {
                include: [{ model: Product, as: 'products' }]
            });

            if (!category) {
                return res.status(404).json({
                    status: 'error',
                    message: `Categoría con ID ${id} no encontrada`
                });
            }

            res.status(200).json({
                status: 'success',
                category: {
                    id: category.id,
                    name: category.name,
                    products: category.products.map(product => ({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        detail: `${req.protocol}://${req.get('host')}/api/products/${product.id}`
                    }))
                }
            });
        } catch (error) {
            console.error('Error al obtener categoría:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error interno del servidor'
            });
        }
    }
};

module.exports = categoriesApiController;
