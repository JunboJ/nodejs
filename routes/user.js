const exp = require('express');

const router = exp.Router();

router.use('/', (req, res, next) => {
    // express send text/html code by default
    res.send('<h1>HELLO FROM EXPRESS.JS!</h1>');
});

module.exports = router;