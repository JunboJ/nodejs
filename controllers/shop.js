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
            // console.log(rows);
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
    req.user
        .getCart()
        .then(cart => {
            if (cart !== null) {
                return cart.getProducts();
            } else {
                req.user.createCart()
                    .then(cart => {
                        return cart.getProducts();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
        .then(products => {
            let prods = [];
            if (products) {
                prods = products;
            }
            res.render('shop/cart', {
                pageTitle: 'My Cart',
                path: '/cart',
                cart: prods
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.post_addToCart = (req, res, next) => {
    let cartItem = null;
    let productId = req.body.productId;
    let cart = null;
    req.user.getCart()
        .then(userCart => {
            if (userCart !== null) {
                cart = userCart;
            } else {
                req.user.creatCart()
                    .then(userCart => {
                        cart = userCart;
                    });
            }
            console.log(cart);

            return cart;
        })
        .then(cart => {
            return Product.findByPk(productId);
        })
        .then(product => {
            if (product) {
                console.log('id: ' + productId);
                cartItem = product;
                return cart.getProducts({ where: { id: productId } });
            } else {
                return Promise.reject('No product found!');
            }
        })
        .then(prod => {
            console.log(prod.length > 0);
            if (prod.length > 0) {
                const qtyOld = prod[0].cartItem.quantity;
                const qtyNew = (qtyOld + 1);
                return cart.addProduct(cartItem, { through: { quantity: qtyNew } })
            }
            return cart.addProduct(cartItem, { through: { quantity: 1 } });
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => {
            console.log(err);
        })
};

exports.post_deleteFromCart = (req, res, next) => {
    let productId = req.body.productId;
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: productId } });
        })
        .then(prod => {
            const product = prod[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        })
};