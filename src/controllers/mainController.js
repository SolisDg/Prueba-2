//Controlador principal

const { Product } = require('../database/models');

const mainController = {
    index: async (req, res) => {
        try {
            const products = await Product.findAll({
                where: { featured: true },
                limit: 4
            });
            res.render('index', { 
                title: 'Pretty Thermo - Inicio',
                currentPage: 'home',
                products: products
            });
        } catch (error) {
            console.error('Error al obtener productos destacados:', error);
            res.render('index', { 
                title: 'Pretty Thermo - Inicio',
                currentPage: 'home',
                products: []
            });
        }
    },
    login: (req, res) => {
        res.render('users/login', { 
            title: 'Iniciar Sesión - Pretty Thermo',
            currentPage: 'login'
        });
    },
    register: (req, res) => {
        res.render('users/register', {
            title: 'Crear Cuenta - Pretty Thermo',
            currentPage: 'register'
        });
    },
    cart: (req, res) => {
        res.render('cart', {
            title: 'Carrito de Compras - Pretty Thermo',
            currentPage: 'cart'
        });
    }
};

module.exports = mainController;