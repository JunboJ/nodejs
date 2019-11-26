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

    Product.create({
        title: title,
        info: info,
        img: img,
        price: price
    })
        .then(
            res.redirect('/admin/add-product')
        )
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
    })
};

exports.post_editing = (req, res, next) => {
    // express send text/html code by default
    // res.sendFile(path.join(rootDir, 'html', 'add-product.html'));
    const prodId = req.params.productId;
    const editedProduct = new Product(req.body.name, req.body.price, req.body.img, req.body.info, prodId);
    editedProduct.save()
        .then(() => {
            res.redirect('/admin/edit-product');
        })
        .catch(err => console.log(err));
};

exports.post_delete = (req, res, next) => {
    const prodId = req.params.productId;
    Product.deleteById(prodId)
        .then(() => {
            res.redirect('/admin/edit-product');
        })
        .catch(err => console.log(err));
};