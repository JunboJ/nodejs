const util = require('util');
// const products = [];
const fs = require('fs');
const path = require('path');
const rootDir = require('../utility/path');
// const p = path.join(rootDir, 'data', 'products.json');
const db = require('../utility/database');

const getAllProductsFromDB = callback => {
    return db.execute('SELECT * FROM `products`');
};
module.exports = class Product {
    constructor(title, price, img, info, id) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.info = info;
        this.id = id;
    };



    save() {
        return getAllProductsFromDB()
            .then(([prods, info]) => {
                if (this.id) {
                    const existedProdIndex = prods.findIndex(prod => prod.id == this.id);
                    console.log("index: " + existedProdIndex);
                    const updatedProds = [...prods];
                    updatedProds[existedProdIndex] = this;
                    return db.execute(
                        'INSERT INTO products (title, price, img, info) VALUES (?, ?, ?, ?)',
                        [updatedProds[existedProdIndex].title, updatedProds[existedProdIndex].price, updatedProds[existedProdIndex].img, updatedProds[existedProdIndex].info]
                    );
                } else {
                    this.id = Math.random().toString()
                    return db.execute(
                        'INSERT INTO products (title, price, img, info) VALUES (?, ?, ?, ?)',
                        [this.title, this.price, this.img, this.info]
                    );
                }
            })
            .catch(err => console.log(err));
    };

    static fetch_all() {
        return getAllProductsFromDB();
    };

    static fetchById(id, callback) {
        db.execute('SELECT * FROM products where id = ?', [id])
            .then(([result, info]) => {
                callback(result[0]);
            })
            .catch(err => console.log(err));
    };

    static deleteById(id) {
        return db.execute('DELETE FROM products WHERE id =' + id);
    };
}