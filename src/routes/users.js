
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const usersController = require('../controllers/usersController');

const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

const registerValidation = 
require('../middlewares/validations/registerValidation');
const loginValidation = require('../middlewares/validations/loginValidation');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/users'));

    },
    filename: (req, file, cb) => {
        const uniqueName = `users-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({storage});
router.get(
    '/register',
    guestMiddleware,        //Si no está logueado
    usersController.showRegister
);
router.post(
    '/register',
    guestMiddleware,        // Si no está logueado
    upload.single('avatar'),    
    registerValidation,   
    usersController.processRegister
    );

//Rutas que requieren login
router.get(
    '/login',
    guestMiddleware,
    usersController.showLogin
);

router.post(
    '/login',
    guestMiddleware,
    loginValidation,         
    usersController.processLogin
);

//Rutas del perfil
router.get(
    '/profile',
    authMiddleware,          
    usersController.profile
);

router.get(
    '/logout',
    usersController.logout
);
module.exports = router;