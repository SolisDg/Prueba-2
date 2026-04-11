
'use strict';

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: 'El nombre de la categoría es obligatorio'
                }
            }
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'categories',
        timestamps: true
    }
);
Category.associate = function(models) {
    Category.hasMany(models.Product, {
        foreignKey: 'categoryId',
        as: 'products'
    });
};
return Category;

};