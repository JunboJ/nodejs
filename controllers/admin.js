const Product = require('../models/product');
exports.get_addProduct = (req, res, next) => {
    // express send text/html code by default
    // res.sendFile(path.join(rootDir, 'html', 'add-product.html'));
    Product.fetch_all((products) => {
        res.render('admin/add-product', {
            pageTitle: 'Add Product',
            path: 'admin/add-product',
            productList: products
        });
    });
};

exports.post_addProduct = (req, res, next) => {
    // product.push({ title: req.body.name, img: req.body.img, info: req.body.info })
    const product = new Product(req.body.name, req.body.img, req.body.info);
    product.save();
    res.redirect('/all-product');
};

exports.get_editProducts = (req, res, next) => {
    Product.fetch_all((products) => {
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: 'admin/edit-product',
            productList: products
        });
    });
};