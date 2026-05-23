//Rutas de los productos

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productsController = require ('../controllers/productsController');

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const productValidation = require('../middlewares/validations/productValidation');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/products'));
    },
    filename: (req, file, cb) => {
        const uniqueName = `product-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

//Rutas públicas
router.get('/', productsController.index);
router.get('/search', productsController.search);

//Rutas CRUD
router.get('/create', adminMiddleware, productsController.create);
router.post('/create', adminMiddleware, upload.single('image'), 
    productValidation, productsController.store
);

router.get('/:id', productsController.detail);

router.get('/:id/edit', adminMiddleware, productsController.edit);
router.put('/:id', adminMiddleware, upload.single('image'),
    productValidation, productsController.update
);

router.delete('/:id', adminMiddleware, productsController.destroy);

module.exports = router;

