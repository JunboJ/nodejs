const fs = require('fs');
const path = require('path');
const rootDir = require('../utility/path');
const p = path.join(rootDir, 'data', 'cart.json');
const Product = require('./product');

const getCartFromFile = callback => {
    fs.readFile(p, (err, data) => {
        let cart;
        if (!err) {
            cart = JSON.parse(data);
            console.log(
                'file found'
            );
        } else {
            cart = { products: [], totalQuantity: 0, totalPrice: 0 };
            console.log(
                'no file found'
            );
        }
        callback(cart);
    });
}

module.exports = class Cart {

    static addProduct(id, itemPrice, qty = 1) {
        const price = parseFloat(itemPrice);
        getCartFromFile((cart) => {
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

    static getProducts(callback) {
        getCartFromFile((cart) => {
            // need to get the details of product in the cart here
            let fullInfoProds = [];
            let updatedCart = { ...cart };
            Product.fetch_all((products) => {
                updatedCart.products.forEach(prod => {
                    let dbProd = products.find(product => product.id == prod.id);
                    if (dbProd === undefined) {
                        let updatedProd = { ...prod, 'pulledOff': true };
                        fullInfoProds.push(updatedProd);
                    } else {
                        let updatedProd = { ...dbProd, 'itemsPrice': prod.itemsPrice, 'qty': prod.qty };
                        fullInfoProds.push(updatedProd);
                    }
                });
                updatedCart.products = [...fullInfoProds];
                callback(updatedCart);
            });
        });
    };

    static deleteProduct(id, callback) {
        getCartFromFile(cart => {
            let deletingProduct = cart.products.find(prod => prod.id == id);
            let updatedProducts = cart.products.filter(prod => prod.id != id);
            let updatedCart = {...cart};
            updatedCart.products = [...updatedProducts];
            updatedCart.totalPrice = updatedCart.totalPrice - deletingProduct.itemsPrice;
            updatedCart.totalQuantity = updatedCart.totalQuantity - deletingProduct.qty;
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log('deleting errors: ' + err);
            });
            callback();
        });
    };
};