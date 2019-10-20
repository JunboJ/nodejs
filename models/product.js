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
        this.id = Math.random().toString();
        getAllProductsFromFile(prods => {
            prods.push(this);
            fs.writeFile(p, JSON.stringify(prods), (err) => {
                console.log(err);
            });
        });
    }

    static fetch_all(callback) {
        getAllProductsFromFile(callback);
    }

    static fetchById(id, callback) {
        getAllProductsFromFile(products => {
            // find() is a default js method, it applies the func we passed
            // to it on every element in the array and return the element which
            // has a true result from the func
            const product = products.find(prod => prod.id === id);
            callback(product);
        })
    }
}