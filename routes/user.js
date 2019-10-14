const exp = require('express');
const path = require('path');

const rootDir = require('../utility/path');
const adminData = require('./admin');

const router = exp.Router();

router.get('/home', (req, res, next) => {
    // express send text/html code by default
        console.log(adminData.product);
        // res.sendFile(path.join(rootDir, 'html', 'user.html'));
    // render method will use default template engine defind in app.js
    const products = adminData.product;
    res.render('user', { productList: products,  pageTitle: 'User Page'});

});

module.exports = router;