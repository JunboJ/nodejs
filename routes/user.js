const exp = require('express');
const path = require('path');

const rootDir = require('../utility/path');
const adminData = require('./admin');

const router = exp.Router();

router.use('/home', (req, res, next) => {
    // express send text/html code by default
    console.log(adminData.product);
    res.sendFile(path.join(rootDir, 'html', 'user.html'));
});

module.exports = router;