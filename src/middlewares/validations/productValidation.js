
const { body } = require('express-validator');
const path = require('path');
const { Category, Color } = require('../../database/models');
const productValidation = [
    body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre del producto es obligatorio')
    .bail()
    .isLength({ min: 5 })
    .withMessage('El nombre debe tener al menos 5 caracteres'),
    
    body('description')
    .trim()
    .notEmpty()
    .withMessage('La descripción es obligatoria')
    .bail()
    .isLength({ min: 20 })
    .withMessage('La descripción debe tener al menos 20 caracteres'),

    body('price')
    .notEmpty()
    .withMessage('El precio es obligatorio')
    .bail()
    .isFloat({ min: 10.00 })
    .withMessage('El precio debe ser un número mayor a 10'),
    
    body('categoryId')
    .notEmpty()
    .withMessage('Debes seleccionar una categoría')
    .bail()
    .custom(async (value) => {
        const category = await Category.findByPk(value);
            
        if (!category) {
            throw new Error('La categoría seleccionada no existe');
        }
            
        return true;
    }),
    
    body('image')
    .custom((value, { req }) => {
        if (!req.file) {
            return true;
        }
            
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const fileExtension = path
            .extname(req.file.originalname)
            .toLowerCase();
            
        if (!allowedExtensions.includes(fileExtension)) {
            throw new Error('Solo se permiten imágenes JPG, PNG');
        }
            
        return true;
    }),
];
module.exports = productValidation;