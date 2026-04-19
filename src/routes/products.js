//Rutas de los productos

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productsController = require ('../controllers/productsController');

const authMiddleware = require('../middlewares/authMiddleware');

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
router.get('/create', authMiddleware, productsController.create);
router.post('/create', authMiddleware, upload.single('image'), 
    productValidation, productsController.store
);

router.get('/:id', productsController.detail);

router.get('/:id/edit', authMiddleware, productsController.edit);
router.put('/:id', authMiddleware, upload.single('image'),
    productValidation, productsController.update
);

router.delete('/:id', authMiddleware, productsController.destroy);

module.exports = router;

