const fs = require('fs');
const path = require('path');
const rootDir = require('../utility/path');
const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
    // constructor () {
    //     this.products = [];
    //     this.totalQuantity = 0;
    // }
    static addProduct(id, itemPrice, qty = 1) {
        const price = parseFloat(itemPrice);
        fs.readFile(p, (err, fileContent) => {
            let cart;
            if (!err) {
                cart = JSON.parse(fileContent);
                console.log(
                    'file found'
                );
            } else {
                cart = { products: [], totalQuantity: 0 };
                console.log(
                    'no file found'
                );
            }

            const existingProdIndex = cart.products.findIndex(prod => prod.id == id);
            console.log('existing product: ' + existingProdIndex);
            let updatedProd;
            if (existingProdIndex !== -1) {
                let existingProd = cart.products[existingProdIndex];
                updatedProd = existingProd;
                updatedProd.qty = updatedProd.qty + qty;
                let itemsPrice = updatedProd.qty * price;
                let addedPrice = qty * price;
                updatedProd.itemsPrice = itemsPrice;
                existingProd = updatedProd;
                cart.totalQuantity = cart.totalQuantity + qty;
                cart.totalPrice = cart.totalPrice + addedPrice;
            } else {
                let itemsprice = price * qty;
                updatedProd = { id: id, unitPrice: price, qty: qty, itemsPrice: itemsprice };
                cart.products = [...cart.products, updatedProd];
                cart.totalQuantity = cart.totalQuantity + qty;
                if (cart.totalPrice) {
                    cart.totalPrice = cart.totalPrice + itemsprice;
                } else {
                    cart.totalPrice = itemsprice;
                }
            }
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    };
};