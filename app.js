const exp = require('express');
// this parser is just for the req send through forms
const parser = require('body-parser');

const app = exp();

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

app.use(parser.urlencoded({extended: false})); // the function in the use() argument has next() at the end

app.use(adminRouter);

app.use(userRouter);
// app.use((req, res, next) => {
//     console.log('the first middleware...');
//     next();
// });

// app.use('/add-product', (req, res, next) => {
//     // express send text/html code by default
//     res.send('<html><head><title>Product page</title></head><body><p><h1>This is add product page...</h1></p><form action="/product" method="POST"><input type="text" name="productName"><button type="submit">Add product</button></form></body></html>');

// });

// // post has similar sytax as 'use' only it is just for post action
// app.post('/product', (req, res, next) => {
//     console.log(req.body);
//     res.redirect('/');
// });

// app.use('/', (req, res, next) => {
//     // express send text/html code by default
//     res.send('<h1>HELLO FROM EXPRESS.JS!</h1>');
// });

app.listen(3000);