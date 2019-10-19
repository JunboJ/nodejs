// const product = [];
const Product = require('../models/product');

exports.get_products = (req, res, next) => {
    // express send text/html code by default
    // console.log(product);
    // res.sendFile(path.join(rootDir, 'html', 'user.html'));

    Product.fetch_all((products) => {
        // render method will use default template engine defind in app.js
        res.render('shop/all-product', {
            pageTitle: 'All Products',
            productList: products,
            hasProduct: products.length > 0,
            path: '/all-product'
        });
    });
};

exports.get_index = (req, res, next) => {
    res.render('shop/shop', {
        pageTitle: 'Shop',
        path: '/'
    });
};

exports.get_cart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'My Cart',
        path: '/cart'
    });
};