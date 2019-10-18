const exp = require('express');
const path = require('path');
// const rootDir = require('../utility/path');

const productController = require('../controllers/products');

const router = exp.Router();

const pathName = '/add-product';
// const product = [];

router.get(pathName, productController.get_addProduct);
router.post(pathName, productController.post_addProduct);

module.exports = {
    "routes": router
};

// same path can be used due to different method
// router.get(pathName, (req, res, next) => {
//     // express send text/html code by default
//     // res.sendFile(path.join(rootDir, 'html', 'add-product.html'));
//     res.render('add-product', { 
//         pageTitle: 'Add Product', 
//         path: pathName, 
//         productList: product, 
//         adminCSS: true, 
//         activeAddProduct: true 
//     });
// });

// post has similar sytax as 'use' only it is just for post action
// router.post(pathName, (req, res, next) => {
//     product.push({ title: req.body.name, img: req.body.img, info: req.body.info })
//     res.redirect('/home');
// });
