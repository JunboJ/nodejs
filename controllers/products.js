// const product = [];
const Product = require('../models/product');
exports.get_addProduct = (req, res, next) => {
    // express send text/html code by default
    // res.sendFile(path.join(rootDir, 'html', 'add-product.html'));
    Product.fetch_all((products) => {
        res.render('add-product', {
            pageTitle: 'Add Product',
            path: '/add-product',
            productList: products,
            adminCSS: true,
            activeAddProduct: true
        });
    });
};

exports.post_addProduct = (req, res, next) => {
    // product.push({ title: req.body.name, img: req.body.img, info: req.body.info })
    const product = new Product(req.body.name, req.body.img, req.body.info);
    product.save();
    res.redirect('/home');
};

exports.get_products = (req, res, next) => {
    // express send text/html code by default
    // console.log(product);
    // res.sendFile(path.join(rootDir, 'html', 'user.html'));

    Product.fetch_all((products) => {
        // render method will use default template engine defind in app.js
        res.render('user', {
            productList: products,
            hasProduct: products.length > 0,
            pageTitle: 'User Page',
            path: '/home',
            userCSS: true,
            activeHome: true
        });
    });
};