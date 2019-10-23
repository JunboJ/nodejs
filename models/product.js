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
        // console.log(data);
        products = JSON.parse(data);
        callback(products);
    });
    // return products;
};

module.exports = class Product {
    constructor(title, img, info, id = Math.random().toString()) {
        this.title = title;
        this.img = img;
        this.info = info;
        this.id = id;
    };

    save() {
        getAllProductsFromFile(prods => {
            prods.push(this);
            fs.writeFile(p, JSON.stringify(prods), (err) => {
                console.log(err);
            });
        });
    };

    save_change(callback) {
        fs.readFile(p, (err, fileContent) => {
            const productList = JSON.parse(fileContent);
            const existedProd = productList.find(prod => prod.id == this.id);
            if (existedProd !== -1) {
                existedProd.title = this.title;
                existedProd.img = this.img;
                existedProd.info = this.info;
                fs.writeFile(p, JSON.stringify(productList), err => {
                    if (err) {
                        console.log(err);
                    }
                });
                callback('Changes have been saved!');
            } else {
                callback('error: none existed product was found.');
            }
        });
    };

    static fetch_all(callback) {
        getAllProductsFromFile(callback);
    };

    static fetchById(id, callback) {
        getAllProductsFromFile(products => {
            // find() is a default js method, it applies the func we passed
            // to it on every element in the array and return the element which
            // has a true result from the func
            const product = products.find(prod => prod.id === id);
            callback(product);
        });
    };
}