// const products = [];
const fs = require('fs');
const path = require('path');
const rootDir = require('../utility/path');
const p = path.join(rootDir, 'data', 'products.json');

const getAllProductsFromFile = callback => {
    let products = [];
    fs.readFile(p, (err, data) => {
        if (err) {
            callback(products);
            return;
        }
        console.log(data);
        products = JSON.parse(data);
        callback(products);
    });
    // return products;
}

module.exports = class Product {
    constructor(title, img, info) {
        this.title = title;
        this.img = img;
        this.info = info;
    }

    save() {
        getAllProductsFromFile(prods => {
            let products = [];
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetch_all(callback) {
        getAllProductsFromFile(callback);
    }
}