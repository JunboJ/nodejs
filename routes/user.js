const exp = require('express');
const path = require('path');

// const rootDir = require('../utility/path');
// const adminData = require('./admin');

const router = exp.Router();

const productController = require('../controllers/products');

router.get('/home', productController.get_products);

module.exports = router;

// router.get('/home', (req, res, next) => {
//     // express send text/html code by default
//         console.log(adminData.product);
//         // res.sendFile(path.join(rootDir, 'html', 'user.html'));
//     // render method will use default template engine defind in app.js
//     const products = adminData.product;
//     res.render('user', {
//         productList: products, 
//         hasProduct: products.length > 0, 
//         pageTitle: 'User Page', 
//         path: pathName, 
//         userCSS: true, 
//         activeHome: true
//     });
// });