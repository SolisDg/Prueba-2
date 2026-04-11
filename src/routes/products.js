//Rutas de los productos

const express = require('express');
const router = express.Router();
const productsController = require ('../controllers/productsController');

//Rutas CRUD
router.get('/', productsController.index);

router.get('/create', productsController.create);

router.post('/', productsController.store);

router.get('/:id', productsController.show);

router.get('/:id/edit', productsController.edit);

router.put('/:id', productsController.update);

router.delete('/:id', productsController.destroy);

module.exports = router;

