
const { User } = require ('../database/models');

const bcrypt = require('bcrypt.js');
const usersController = {
    registerForm: (req, res) => {
        res.render('users/register', {
            title: 'Crear cuenta'
        });
    },
    register: async (req, res) => {
        try {
            const { firstName, lastName, email, password, confirmPassword} = req.body;
            if (password !== confirmPassword) {
                return res.render('users/register', {
                    title: 'Crear cuenta',
                    errors: [{msg: 'Las contraseñas no coinciden'}],
                    old: req.body
                });
            }
            const existingUser = await User.findOne({
                where: { email }
            });
            if (existingUser) {
                return res.render('users/register', {
                    title:'Crear cuenta',
                    errors: [{ msg: 'Este email ya está registrado'}],
                    old: req.body
                });
            }
            const avatar = req.file ? req.file.filename : 'default-avatar.png';
            await User.create({
                firstName,
                lastName,
                email,
                password,
                avatar
            });
            res.redirect('/users/login');
        } catch (error) {
            console.error('Error en registro:', error);
            res.render('users/register', {
                title: 'Crear cuenta',
                errors: [{ msg: 'Error al crear la cuenta. Intenta de nuevo.'}],
                old: req.body
            });
        }
    },
    loginForm: (req, res) => {
        res.render('users/login', {
            title: 'Iniciar sesión'
        });
    },
    login: async (req, res) => {
        try {
            const { email, password, rememberMe} = req.body;
            const user = await User.findOne({
                where: {email}
            });
            if (!user) {
                return res.render('users/login', {
                    title: 'Iniciar sesión',
                    errors: [{ msg: 'Email o contraseña incorrectos'}],
                    old: { email }
                });
            }
            const isValidPassword = await user.validPassword(password);
            if (!isValidPassword) {
                return res.render ('users/login', {
                    title: 'Iniciar sesión',
                    errors: [{ msg: 'Email o contraseña incorrectos'}],
                    old: {email}
                });
            }
            req.session.userLogged = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                avatar: user.avatar,
                role: user.role
            };
            if(rememberMe) {
                res.cookies('rememberUser', user.email, {
                    maxAge: 1000 *60 * 60 * 24 * 60,
                    httpOnly: true
                });
            }
            res.redirect('/users/profile');
        } catch (error) {
            console.error('Error en inicio de sesión:', error);
            res.render('users/login', {
                title: 'Iniciar sesión',
                errors: [{ msg: 'Error al iniciar sesión'}]
            });
        }
    },
    profile: async (req, res) => {
        try {
            const user = await User.findByPk(req.session.userLogged.id);
            res.render('users/profile', {
                title: 'Mi perfil',
                user
            });
        } catch(error){
            console.error('Error al cargar el perfil:', error);
            res.redirect('/');
        }
    },
    logout: (req, res) => {
        req.session.destroy((err) => {
            if(err) {
                console.error('Error al cerrar sesión:', err);
            }
            res.clearCookie('rememberUser');
            res.redirect('/');
        });
    }
};
module.exports = usersController;