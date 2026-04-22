
const { validationResult } = require('express-validator');
const { User } = require ('../database/models');

const bcrypt = require('bcryptjs');
const usersController = {
    showRegister: (req, res) => {
        res.render('users/register', {
            title: 'Crear Cuenta - Pretty Thermo',
            errors: [],
            old: {}
        });
    },
    processRegister: async (req, res) => {
        const errors = validationResult(req);
        console.log('--- Intentando registro ---');
        console.log('Body:', req.body);
        console.log('File:', req.file);

        if (!errors.isEmpty()){
            console.log('Errores de validación:', errors.mapped());
            return res.render('users/register', {
                title: 'Crear Cuenta - Pretty Thermo',
                errors: errors.mapped(),
                old: req.body
            });
        }
        try {
            const nameParts = req.body.name.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ') || '.';

            await User.create({
                firstName: firstName,
                lastName: lastName,
                email: req.body.email,
                password: req.body.password, // El hook beforeCreate en el modelo se encarga de hashear
                avatar: req.file ? req.file.filename : 'default-avatar.png'
            });
            console.log('Usuario creado con éxito');
            res.redirect('/users/login');
        } catch (error) {
            console.error('Error en User.create:', error);
            res.render('users/register', {
                title: 'Crear Cuenta - Pretty Thermo',
                errors: { general: {msg: 'Error al crear el usuario. Intenta de nuevo.'}},
                old: req.body
            });
        }
    },

    showLogin: (req, res) => {
        res.render('users/login', {
            title: 'Iniciar Sesión - Pretty Thermo',
            errors: [],
            old: {}
        });
    },

    processLogin: async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.render('users/login', {
                title: 'Iniciar Sesión - Pretty Thermo',
                errors: errors.mapped(),
                old: req.body
            });
        }
        const user = req.userFound;
        req.session.userLogged = {
            id: user.id,
            name: user.firstName,
            email: user.email,
            avatar: user.avatar
        };
        res.redirect('/users/profile');
        if (req.body.remember) {
            res.cookie('userEmail', user.email, {
                maxAge: 1000 * 60 * 60 * 24 * 14
            });
        }
        res.redirect('/users/profile');
    },

    profile: (req, res) => {
        res.render('users/profile', {
            title: 'Mi Perfil - Pretty Thermo',
            user: req.session.user || req.session.userLogged
        });
    },

    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('userEmail');
        res.redirect('/');
    }
};

module.exports = usersController;