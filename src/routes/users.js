
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const usersController = require('../controllers/usersControllers');

const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/users'));

    },
    filename: (req, file, cb) => {
        const uniqueName = `users-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if(allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no permitido'), false);
        }
    }
});

//Rutas sin login
router.get('/registro', guestMiddleware, 
usersController.registerForm);

router.post('/registro', guestMiddleware, upload.single('avatar'), 
usersController.register);

router.get('/login', guestMiddleware, usersController.loginForm);

router.post('/login', guestMiddleware, usersController.login);

//Rutas que requieren login
router.get('/perfil', authMiddleware, usersController.profile);

router.get('/logout', authMiddleware, usersController.logout);

module.exports = router;