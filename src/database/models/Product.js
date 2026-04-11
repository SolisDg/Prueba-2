
'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'El nombre del producto es obligatorio'
                },
                len: {
                    args: [2, 100],
                    msg: 'El nombre debe tener entre 2 y 100 caracteres'
                }
            }
        },
        // Columna: descripción del producto
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                isDecimal: {
                    msg: 'El precio debe ser un número válido'
                },
                min: {
                    args: [0],
                    msg: 'El precio no puede ser negativo'
                }
            }
        },
    
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: 'default-product.png'
        },
    
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                isInt: {
                    msg: 'El stock debe ser un número entero'
                },
                min: {
                    args: [0],
                    msg: 'El stock no puede ser negativo'
                }
            }
        },
    
        color: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
    
        capacity: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
    
        featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    
        // Columna: ID de la categoría (llave foránea)
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Categories',
                key: 'id'
            }
        }
    }, {
        tableName: 'products',     
        timestamps: true,          
        paranoid: false
    });

    Product.associate = function(models) {
    // Un producto pertenece a una categoría
        Product.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category'
        });
    };
    return Product;
};