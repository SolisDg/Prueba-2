
'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: { msg:'El nombre es obligatorio'},
                len: { 
                    args: [2, 50], 
                    msg: 'El nombre debe tener entre 2 y 50 caracteres'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {msg: 'El apellido es obligatorio'}
            }
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {msg: 'Debe ser un email válido'},
                notEmpty: {msg: 'El email es obligatorio'}
            }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: {msg: 'La contraseña es obligatoria'},
                len: {args: [8, 255], msg: 'La contraseña debe tener al menos 8 caracteres'}
            }
        },
        avatar: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: 'default-avatar.png'
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user'
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'users',
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    });
    User.prototype.validPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };
    User.prototype.fullName = function() {
        return `${this.firstName} ${this.lastName}`;
    };


    return User;
};