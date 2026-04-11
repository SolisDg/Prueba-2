//Controlador principal

const mainController = {
    index: (req, res) => {
        res.render('index', { 
            title: 'Pretty Thermo - Inicio',
            currentPage: 'home'
        });
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
    }
};

module.exports = mainController;