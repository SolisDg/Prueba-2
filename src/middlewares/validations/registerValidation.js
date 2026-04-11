//Validaciones de registro de usuarios

const { body } = require('express-validator');

const { User } = require('../../database/models');

const path = require('path');
const { where } = require('sequelize');

const registerValidation = [
    body('name')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .bail()
    .isLength({ min: 2 })
    .withMessage('El nombre debe tener al menos 2 caracteres'),

    body('email')
    .notEmpty()
    .withMessage('El email es obligatorio')
    .bail()
    .isEmail()
    .withMessage('Debe ser un email válido')
    .bail()
    .normalizeEmail()
    .custom(async (value) => {
        const existingUser = await User.findOne({
            where: { email: value }
        });
        if (existingUser) { throw new Error('Este email ya está registrado');}
        return true;
    }),
    body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .bail()
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]/)
    .withMessage('La contraseña debe incluir mayúscula, minúscula, número y carácter especial (@$!%*?&)'),

    body('confirmPassword')
    .notEmpty()
    .withMessage('Debes confirmar la contraseña')
    .bail()
    .custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),

    body('avatar')
    .custom((value, {req}) => {
        if(!req.file) {
            return true;
        }
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            throw new Error('Solo se permiten imágenes JPG, JPEG, PNG');
        }
        return true;
    })
];

module.exports = registerValidation;