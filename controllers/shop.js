// const product = [];
const Product = require('../models/product');
const cart = require('../models/cart');

exports.get_products = (req, res, next) => {
    // express send text/html code by default
    // console.log(product);
    // res.sendFile(path.join(rootDir, 'html', 'user.html'));

    Product.findAll()
        .then((rows) => {
            // render method will use default template engine defind in app.js
            res.render('shop/all-product', {
                pageTitle: 'All Products',
                productList: rows,
                hasProduct: rows.length > 0,
                path: '/all-product'
            });
        })
        .catch(err => console.log(err));
};

exports.get_product = (req, res, next) => {
    const pid = req.params.productId;
    Product.findByPk(pid)
        .then(prod => {
            res.render('shop/details', {
                pageTitle: prod.title,
                product: prod,
                path: '/details'
            });
        })
        .catch();
};

exports.get_index = (req, res, next) => {
    res.render('shop/shop', {
        pageTitle: 'Shop',
        path: '/'
    });
};

exports.get_cart = (req, res, next) => {
    cart.getProducts((cartProds) => {
        res.render('shop/cart', {
            pageTitle: 'My Cart',
            path: '/cart',
            cart: cartProds
        });
    })
};

exports.post_addToCart = (req, res, next) => {
    let productId = req.body.productId;
    let productPrice = req.body.productPrice;
    Product.findByPk(productId)
        .then(product => {
            cart.addProduct(productId, productPrice);
            res.redirect('/cart');
        })
        .catch();
};

exports.post_deleteFromCart = (req, res, next) => {
    let productId = req.params.productId;
    cart.deleteProduct(productId, () => {
        res.redirect('/cart');
    });
};