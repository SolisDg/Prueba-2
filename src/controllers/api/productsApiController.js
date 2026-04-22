//Controlador de la Api, productos

const { Product, Category, Color } = require('../../database/models');
const productsApiController = {
    //Listar productos con paginación:
    list: async (req, res) =>{
        try{
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;

            const totalProducts = await Product.count();
            const totalPages = Math.ceil(totalProducts/limit);

            const products = await Product.findAll({
                include: [{model: Category, as: 'category'}],
                limit: limit,
                offset: offset,
                order: [['createdAt', 'DESC']]
            });
            const baseUrl = `${req.protocol}://${req.get('host')}/api/products`;

            const response = {
                status: 'sucess',
                count: totalProducts,
                countThisPage: products.length,
                currentPage: page,
                totalPages: totalPages,
                previous: page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}`: null,
                products: products.map(product => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    category: product.category ? product.category.name : null,
                    image: `${req.protocol}://${req.get('host')}/images/products/${product.image}`,
                    detail: `${baseUrl}/${product.id}`
                }))
            };
            res.status(200).json(response);

        } catch (error) {
            console.error('Error al listar productos:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error interno del servidor'
            });
        }
    },
    detail: async (req, res) => {
        try{
            const {id} = req.params;
            const product = await Product.findByPk(id, {
                include: [
                    {model: Category, as: 'category'},
                    {model: Color, as: 'colors'}
                ]
            });
            if (!product) {
                return res.status(404).json({
                    status: 'error',
                    message: `Producto con ID ${id} no encontrado`
                });
            }
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            res.status(200).json({
                status: 'success',
                product: {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    image: `${baseUrl}/images/products/${product.image}`,
                    category: product.category ? {
                        id: product.category.id,
                        name: product.category.name
                    } : null,
                    colors: product.colors.map(c => ({
                        id: c.id,
                        name: c.name,
                        hex: c.hex
                    })),
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt
                }
            });
        } catch (error) { 
            console.error('Error al obtener producto:', error);
            res.status(500).json({
                status: 'error', 
                message: 'Error interno del servidor'
            });
        }
    },
    create: async (req, res) => {
        try {
            const { name, description, price, stock, categoryId} = req.body;
            if ( !name || !price) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Nombre y precio son obligatorios'
                });
            }
            const newProduct = await Product.create({
                name,
                description,
                price,
                stock: stock || 0,
                categoryId,
                image: 'default-product.png'
            });
            res.status(201).json({
                status:  'success',
                message: 'Producto creado exitosamente',
                product: newProduct
            });
        } catch (error) {
            console.error('Error al crear producto:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error al crear el producto'
            });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, price, stock, categoryId } = req.body;
            
            // Buscar producto
            const product = await Product.findByPk(id);
            
            if (!product) {
                return res.status(404).json({
                    status: 'error',
                    message: `Producto con ID ${id} no encontrado`
                });
            }
            await product.update({
                name: name || product.name,
                description: description || product.description,
                price: price || product.price,
                stock: stock !== undefined ? stock : product.stock,
                categoryId: categoryId || product.categoryId
            });
            res.status(200).json({
                status: 'success',
                message: 'Producto actualizado exitosamente',
                product: product
            });
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error al actualizar el producto'
            });
        }
    },
    destroy: async (req, res) => {
        try {
            const {id} = req.params;
            const product = await Product.findByPk(req.params.id);
            
            if (!product) {
                return res.status(404).json({ 
                    status: 'error',
                    message: `Producto con ID ${id} no encontrado` 
                });
            }
            
            await product.destroy();

            res.status(200).json({ 
                message: 'Producto eliminado exitosamente' 
            });
        } catch (error) {
            console.error('Error al eliminar producto', error);
            res.status(500).json({ 
                status: 'error',
                message: 'Error al eliminar el producto',
                
            });
        }
    }
};

module.exports = productsApiController;
    



