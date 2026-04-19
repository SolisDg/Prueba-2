
const { validationResult } = require('express-validator');
const { User } = require ('../database/models');

const bcrypt = require('bcryptjs');
const usersController = {
    showRegister: (req, res) => {
        res.render('users/register', {
            errors: [],
            old: {}
        });
    },
    processRegister: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.render('users/register', {
                errors: errors.mapped(),
                old: req.body
            });
        }
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await User.create ({
                name: req.body.name,
                email: req.body.mail,
                password: hashedPassword,
                avatar: req.file ? req.file.filename : 'defaul-avatar.png'
            });
            res.redirect('/users/login');
        } catch (error) {
            console.error(error);
            res.render('users/register', {
                errors: { general: {msg: 'Error al crear el usuario'}},
                old: req.body
            });
        }
    },

    showLogin: (req, res) => {
        res.render('users/login', {
            errors: [],
            old: {}
        });
    },

    processLogin: async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.render('users/login', {
                errors: errors.mapped(),
                old: req.body
            });
        }
        const user = req.userFound;
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        };
        if (req.body.remember) {
            res.cookie('userEmail', user.email, {
                maxAge: 1000 * 60 * 60 * 24 * 14
            });
        }
        res.redirect('/users/profile');
    },

    profile: (req, res) => {
        res.render('users/profile', {
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