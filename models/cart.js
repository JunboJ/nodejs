const fs = require('fs');
const path = require('path');
const rootDir = require('../utility/path');
const p = path.join(rootDir, 'data', 'products.json');

module.exports = class Cart {
    // constructor () {
    //     this.products = [];
    //     this.totalQuantity = 0;
    // }
    static addProduct(id, qty = 1) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalQuantity: 0 };
            if (err) {
                cart.push(id);
            } else {
                cart = JSON.parse(fileContent);
            }

            const existingProdIndex = cart.products.findIndex(prod.id == id);
            let updatedProd;
            if (existingProdIndex) {
                const existingProd = cart.products[existingProdIndex];
                updatedProd = existingProd;
                updatedProd.qty = updatedProd.qty + qty;
                existingProd = updatedProd;
            } else {
                updatedProd = { id: id, qty: qty };
                cart.products = [...cart.products, updatedProd];
                cart.qty = cart.qty + qty;
            }
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    };
};