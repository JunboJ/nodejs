const Product = require('../models/product');

exports.get_addProduct = (req, res, next) => {
    // express send text/html code by default
    // res.sendFile(path.join(rootDir, 'html', 'add-product.html'));
    Product.findAll()
        .then((products) => {
            res.render('admin/editing', {
                pageTitle: 'Add Product',
                path: 'admin/add-product',
                productList: products,
                editing: false
            })
        })
        .catch(err => console.log(err));
};

exports.post_addProduct = (req, res, next) => {
    // product.push({ title: req.body.name, img: req.body.img, info: req.body.info })
    const title = req.body.title;
    const price = req.body.price;
    const img = req.body.img;
    const info = req.body.info;
    console.log('title: ' + title);
    req.user.createProduct({
        title: title,
        info: info,
        img: img,
        price: price
    })
        .then((result) => {
            res.redirect('/admin/add-product')
        })
        .catch(err => console.log(err));
};

exports.get_editProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: 'admin/edit-product',
                productList: products
            })
        })
        .catch(err => console.log(err));
};

exports.get_editing = (req, res, next) => {
    // express send text/html code by default
    // res.sendFile(path.join(rootDir, 'html', 'add-product.html'));
    const prodId = req.params.productId;
    Product.findByPk(prodId).then(
        (prod) => {
            res.render('admin/editing', {
                pageTitle: 'Edit Product',
                path: 'admin/editing',
                productList: prod,
                editing: true
            });
        }
    ).catch(err => {
        console.log(err);
    });
};

exports.post_editing = (req, res, next) => {
    // express send text/html code by default
    // res.sendFile(path.join(rootDir, 'html', 'add-product.html'));
    const prodId = req.params.productId;
    const prodTitle = req.body.title;
    const prodPrice = req.body.price;
    const prodImg = req.body.img;
    const prodInfo = req.body.info;
    Product.findByPk(prodId)
        .then(product => {
            product.title = prodTitle;
            product.price = prodPrice;
            product.img = prodImg;
            product.info = prodInfo;
            product.save().then(() => {
                res.redirect('/admin/edit-product');
            })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => console.log(err));
};

exports.post_delete = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(prod => {
            return prod.destroy();
        })
        .then(() => {
            res.redirect('/admin/edit-product');
        })
        .catch();
};