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
    constructor(title, price, img, info, id) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.info = info;
        this.id = id;
    };

    
    
    save() {
        getAllProductsFromFile(prods => {
            if (this.id) {
                const existedProdIndex = prods.findIndex(prod => prod.id == this.id);
                console.log("index: "+existedProdIndex);
                const updatedProds = [...prods];
                updatedProds[existedProdIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProds), err => {
                    if (err) {
                        console.log(err);
                    }
                });
            } else {
                this.id = Math.random().toString()
                prods.push(this);
                fs.writeFile(p, JSON.stringify(prods), (err) => {
                    console.log('saving errors: ' + err);
                });
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

    static deleteById(id, callback) {
        getAllProductsFromFile(products => {
            let updatedProducts = products.filter(prod => prod.id != id);
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                console.log('deleting errors: ' + err);
            });
            callback();
        });
    };
}