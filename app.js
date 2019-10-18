const exp = require('express');

// express-handlebars need to be required
// const expHbs = require('express-handlebars');

// this parser is just for the req send through forms
const parser = require('body-parser');


// node.js core module path
const path = require('path');

// start express.js
const app = exp();

// setup template engine here

    // this line is to tell express.js which engine it's going to use
// app.set('view engine', 'pug');

    // Here we start to setup express-handlebars
    // the first argument is the name you give to the engine
// app.engine('handlebars', expHbs({
//     layoutsDir: 'views/layouts', //default value; optional
//     defaultLayout: 'main-layout',
//     extname: 'handlebars' //default value; optional
// }));
// app.set('view engine', 'handlebars');

    // Next is ejs
app.set('view engine', 'ejs');
app.set('views', 'html');

    // this line is to tell express.js where are the templates
    // the sencond argument is optional due to the default path of key
    // word 'views' is '/views', but my folder which holds all the templates
    // called html. Therefore the second argument is configured
// app.set('views', 'html');




// require routes here
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

// here we use parser to parse url
app.use(parser.urlencoded({extended: false})); // the function in the use() argument has next() at the end

// here to give all requests the access to public folder
app.use(exp.static(path.join(__dirname, 'public'))); //give access to public folder

// filtering pages by add common path name here
app.use('/admin', adminRouter.routes);
app.use(userRouter);

// here to handle the situation when random url is inputted
app.use((req, res ,next) => {
    // add layout property to use layout or not to
    res.status(404).render('404', {
        pageTitle: '404', 
        path: 'none', 
        errorCSS: true 
    });
});

// express.js way for server to listen a certain port
app.listen(3000);




// //////////////////////////////////////////////////////////////
// SOME OLD CODE WHEN BUILD ROUTES FOR THE FIRST TIME

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

// app.listen(3000);