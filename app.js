const exp = require('express');

// express-handlebars need to be required
// const expHbs = require('express-handlebars');

// this parser is just for the req send through forms
const parser = require('body-parser');


// node.js core module path
const path = require('path');

// import sequelize file and sync the database at the end of this file
const sequelize = require('./utility/database');
const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
const Orders = require('./models/orders');
const OrderItems = require('./models/orderItems');

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

// this line is to tell express.js where are the templates
// the sencond argument is optional due to the default path of key
// word 'views' is '/views', but my folder which holds all the templates
// called html. Therefore the second argument is configured
// app.set('views', 'html');




// require routes here
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const _404controller = require('./controllers/404');

// here we use parser to parse url
app.use(parser.urlencoded({ extended: false })); // the function in the use() argument has next() at the end

// here to give all requests the access to public folder
app.use(exp.static(path.join(__dirname, 'public'))); //give access to public folder

// get user from database
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            // console.log(user);
            next();
        })
        .catch(err => console.log(err));
});

// filtering pages by add common path name here
app.use('/admin', adminRouter.routes);
app.use(userRouter);

// here to handle the situation when random url is inputted
app.use(_404controller.get_404);

// set relations between modules
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
User.hasMany(Orders);
Orders.belongsTo(User);
Orders.belongsToMany(Product, { through: OrderItems });


// sync database before run the server
sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({
                firstName: 'James',
                lastName: 'Zhang',
                email: 'junboz@gmail.com'
            });
        }
        return user;
    })
    .then(user => {
        // console.log(user);
        // express.js way for server to listen a certain port
        app.listen(3000);
    })
    .catch(err => console.log(err));





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