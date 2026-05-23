//Rutas de la Api, productos

const express = require('express');
const router = express.Router();

const productsApiController = require('../../controllers/api/productsApiController');
const adminMiddleware = require('../../middlewares/adminMiddleware');

//Endpoints

//Listar productos:
router.get('/', productsApiController.list);

//Obtener producto por id
router.get('/:id', productsApiController.detail);

//Crear un nuevo producto:
router.post('/', adminMiddleware, productsApiController.create);

//Actualizar un producto:
router.put('/:id', adminMiddleware, productsApiController.update);

//Eliminar un producto:
router.delete('/:id', adminMiddleware, productsApiController.destroy);

module.exports = router;