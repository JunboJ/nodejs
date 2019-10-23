// const product = [];
const Product = require('../models/product');
const cart = require('../models/cart');

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

exports.get_product = (req, res, next) => {
    const pid = req.params.productId;
    Product.fetchById(pid, prod => {
        console.log(prod);
        res.render('shop/details', {
            pageTitle: prod.title,
            product: prod,
            path: '/details'
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

exports.post_cart = (req, res, next) => {
    let productId = req.body.productId;
    Product.fetchById(productId, (product) => {
        cart.addProduct(productId);
        res.redirect('/cart');
    });
};