//Modelo de  los productos

const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

//Funciones auxiliares

function getAllProducts() {
    const fileContent = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(fileContent);
}

function saveAllProducts(products) {
    const jsonContent = JSON.stringify(products, null, 4);
    writerFileSync(productsFilePath, jsonContent, 'utf-8');
}

function generateID() {
    const products = getAllProducts();
    if (products.length === 0) return 1;
    //Buscar la posición del Id más alto (el último producto)], obtener su ID y luego sumarle 1
    const lastProduct = products[products.length - 1];
    return lastProduct.id + 1;
}

const Product = {
    findAll: () => {
        return getAllProducts()
    },
    findById: (id) => {
        const products = getAllProducts();
        return products.find(product => product.id === id);
    },

    create: (productData) => {
        const products = getAllProducts();
        const newProduct = {
            id: generateID(),
            name: productData.name,
            description: productData.description,
            price: parseFloat(productData.price),
            image: productData.image || '/images/products/default.jpg',
            category: productData.category,
            capacity: productData.capacity,
            stock: parseInt(productData.stock),
            featured: productData.featured === 'true'

        };
        products.push(newProduct);
        saveAllProducts(products);
        
        return newProduct;
    },
    update: (id, productData) => {
        const products = getAllProducts();
        const index = products.findIndex(product => product.id === id);
        
        if (index === -1) return null;

        products[index] = {
            id: id, 
            name: productData.name,
            description: productData.description,
            price: parseFloat(productData.price),
            image: productData.image,
            category: productData.category,
            capacity: productData.capacity,
            stock: parseInt(productData.stock),
            featured: productData.featured === 'true',
        };

        saveAllProducts(products);
        return products[index];
    },

    delete: (id) => {
        const products = getAllProducts();
        const index = products.findIndex(product => product.id === id);
            if (index === -1) return false;

            products.splice(index, 1);
            saveAllProducts(products);

            return true;
    },

    findFeatured: () => {
        const products = getAllProducts();
        return products.filter(product => product.featured === true);
    },
};
    module.exports = Product;
