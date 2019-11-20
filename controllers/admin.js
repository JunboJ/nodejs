const Product = require('../models/product');

exports.get_addProduct = (req, res, next) => {
    // express send text/html code by default
    // res.sendFile(path.join(rootDir, 'html', 'add-product.html'));
    Product.fetch_all()
        .then(([products, info]) => {
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
    const product = new Product(
        req.body.name,
        req.body.price,
        req.body.img,
        req.body.info
    );
    product
        .save()
        .then(() => {
            res.redirect('/admin/add-product');
        })
        .catch(err => console.log(err));
};

exports.get_editProducts = (req, res, next) => {
    Product.fetch_all(([products, info]) => {
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: 'admin/edit-product',
            productList: products
        });
    });
};

exports.get_editing = (req, res, next) => {
    // express send text/html code by default
    // res.sendFile(path.join(rootDir, 'html', 'add-product.html'));
    const prodId = req.params.productId;
    Product.fetchById(prodId, prod => {
        res.render('admin/editing', {
            pageTitle: 'Edit Product',
            path: 'admin/editing',
            productList: prod,
            editing: true
        });
    });
};

exports.post_editing = (req, res, next) => {
    // express send text/html code by default
    // res.sendFile(path.join(rootDir, 'html', 'add-product.html'));
    const prodId = req.params.productId;
    const editedProduct = new Product(req.body.name, req.body.price, req.body.img, req.body.info, prodId);
    editedProduct.save();
    res.redirect('/admin/edit-product');
};

exports.post_delete = (req, res, next) => {
    const prodId = req.params.productId;
    Product.deleteById(prodId, () => {
        res.redirect('/admin/edit-product');
    });
};