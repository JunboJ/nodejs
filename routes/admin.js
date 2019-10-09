const exp = require('express');

const router = exp.Router();

router.get('/add-product', (req, res, next) => {
    // express send text/html code by default
    res.send('<html><head><title>Product page</title></head><body><p><h1>This is add product page...</h1></p><form action="/product" method="POST"><input type="text" name="productName"><button type="submit">Add product</button></form></body></html>');

});

// post has similar sytax as 'use' only it is just for post action
router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;