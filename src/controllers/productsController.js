//Controlador de productos

const {Product, Category}= require('../database/models');
const {Op} = require('sequelize');
const productsController = {
    index: async (req, res) => {
        try {
        const products = await Product.findAll({
            where: {active:true},
            include: [{
                model: Category,
                as: 'category'
            }],
            order: [['createdAt', 'DESC']]
        });
        res.render('products/index', {
            products,
            title: 'Nuestros productos',
            
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.render('error', {message: 'Error al cargar los productos'});
    }
},
    detail: async (req, res) => {
        try {
        const {id} = req.params;
        const product = await Product.findByPk(id, {
            include: [{
                model: Category,
                as: 'category'
            }]
        });
        
        if (!product) {
            return res.status(404).render('error 404', {
                message: 'Producto no encontrado 😔'
            });
        }

        res.render('products/detail', {
            product,
            title: product.name,
            
        });
    }catch (error) {
        console.error('Error al obtener producto:', error);
        res.render('error', {message: 'Error al cargar el producto'});
    }
},

    create: async (req, res) => {
        try{
        const categories = await Category.findAll();
        res.render('products/create', {
            categories,
            message: 'Crear Producto'
            
        });
    }catch (error) {
        console.error('Error:', error);
        res.redirect('/products');
    }
},
    
    store: async (req, res) => {
        try{
        const {name, description, price, stock, color, capacity, categoryId, featured} = req.body;
        const image= req.file ? req.file.filename: 'default-product.png';

        await Product.create({
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock) || 0,
            color,
            capacity,
            image,
            categoryId: categoryId || null,
            featured: featured === 'on'

        });
        res.redirect('/products');
    }catch (error) {
        console.error('Error al crear producto:', error);
        const categories = await Category.findAll();
        res.render('products/create', {
            categories,
            errors: [{ msg: 'Error al crear el producto'}],
            old: req.body
        });
    }
},

    edit: async (req, res) => {
        try {
        const {id} = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).render('error 404', {
                message: 'Producto no encontrado 😔'
            });
        }
        const categories = await Category.findAll();
        
        res.render('products/edit', {
            product,
            categories,
            title: `Editar: ${product.name}`

        });
    }catch (error) {
        console.error ('Error:', error);
        res.redirect('/products');
    }
},

    update: async (req, res) => {
        try{
        const {id} = req.params;
        const {name, description, price, stock, color, capacity, categoryId, featured} = req.body;
        const product = await Product.findByPk(id);
        
        if (!product) {
            return res.status(404).render('error 404', {
                message: 'Producto no encontrado 😔'
            });
        }
        const updateData = {
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock) || 0,
            color,
            capacity,
            categoryId: categoryId || null,
            featured: featured === 'on'
        };
        if (req.file){
            updateData.image = req.file.filename;
        }
        await product.update(updateData);
        res.redirect(`/products/${id}`);
    } catch (error) {
        console.error('Error al actualizar:', error);
        res.redirect(`/products/${req.params.id}/edit`);
    }
},

    destroy: async (req, res) => {
        try{
        const {id} = req.params;
        const product = await Product.findByPk(id);
        
        if (!product) {
            return res.status(404).render('error 404', {
                message: 'Producto no encontrado 😔'
            });
        }
        await product.destroy();
        res.redirect('/products');
    }catch (error) {
        console.error('Error al eliminar:', error);
        res.redirect('/products');
    }
},
//Buscar producto
search: async (req, res) => {
    try{
        const {q} = req.query;
        const products = await Product.findAll({
            where: {
                active: true,
                [Op.or]: [
                    {name: {[Op.like]: `%${q}%`}},
                    {description: {[Op.like]: `%${q}%`}}
                ]
            },
            include: [{ model: Category, as: 'category'}]
        });
        res.render('products/index', { 
            products,
            title: `Resultados para: ${q}`,
            searchTerm: q
        });
    } catch (error) {
        console.error('Error en búsqueda:', error);
        res.redirect('/products');
    }
}

};

module.exports = productsController;