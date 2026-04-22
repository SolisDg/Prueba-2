//Rutas de la Api, productos

const express = require('express');
const router = express.Router();

const productsApiController = require('../../controllers/api/productsApiController');

//Endpoints

//Listar productos:
router.get('/', productsApiController.list);

//Obtener producto por id
router.get('/:id', productsApiController.detail);

//Crear un nuevo producto:
router.post('/', productsApiController.create);

//Actualizar un producto:
router.put('/:id', productsApiController.update);

//Eliminar un producto:
router.delete('/:id', productsApiController.destroy);

module.exports = router;