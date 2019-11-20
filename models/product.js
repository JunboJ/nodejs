// const products = [];
const fs = require('fs');
const path = require('path');
const rootDir = require('../utility/path');
// const p = path.join(rootDir, 'data', 'products.json');
const db = require('../utility/database');

const getAllProductsFromDB = callback => {

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
        getAllProductsFromDB(prods => {
            
        });
    };

    static fetch_all() {
        return db.execute('SELECT * FROM `products`');
    };

    static fetchById(id, callback) {
        const result =  db.execute('SELECT * FROM nodejsstudy.products where id = ' + id);
        callback(result);
    };

    static deleteById(id, callback) {

    };
}