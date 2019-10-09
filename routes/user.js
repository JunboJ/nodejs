const path = require('path');

const exp = require('express');

const router = exp.Router();

router.use('/home', (req, res, next) => {
    // express send text/html code by default
    res.sendFile(path.join(__dirname, '../', 'html', 'user.html'));
});

module.exports = router;