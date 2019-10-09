const exp = require('express');

const path = require('path');
const rootDir = require('../utility/path');

const router = exp.Router();


// same path can be used due to different method
router.get('/add-product', (req, res, next) => {
    // express send text/html code by default
    res.sendFile(path.join(rootDir, 'html', 'add-product.html'));

});

// post has similar sytax as 'use' only it is just for post action
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/home');
});

module.exports = router;