
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
const { User } = require('../../database/models');
const loginValidation = [
    body('email')
    .notEmpty()
    .withMessage('El email es obligatorio')
    .bail()
    .isEmail()
    .withMessage('Debe ser un email válido')
    .bail()
    .custom(async (value, { req }) => {
        const user = await User.findOne({
            where: { email: value }
        });
            
        if (!user) {
            throw new Error('Credenciales inválidas');
        }
            
        // Guardamos el usuario en req para usarlo después
        req.userFound = user;
        return true;
        }),

        body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .bail()
        .custom(async (value, { req }) => {
            if (!req.userFound) {
                throw new Error('Credenciales inválidas');
            }
            // Comparamos la contraseña ingresada con la encriptada
            const isValidPassword = await bcrypt.compare(
                value,                       
                req.userFound.password       
            );
            if (!isValidPassword) {
                throw new Error('Credenciales inválidas');
            }
            
            return true;
            })
];

module.exports = loginValidation;
