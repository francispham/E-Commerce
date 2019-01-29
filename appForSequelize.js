const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

// Add Error Controller:
const errorController = require('./controllers/error');

// Add MySQL Database:
// const db = require('./util/database'); //Before Sequelize
const sequelize = require('./util/database');

const path = require('path');
const rootDir = require('./util/path');

// Add Models for Associations:
const Product = require('./models/product');
const User = require('./models/user');

const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const Order = require('./models/order');
const OrderItem = require('./models/order-item');


const app = express();


// Implement Ejs:
app.set('view engine', 'ejs');
/* 
// Implement Handlebars:
app.engine(
    'hbs', 
    expressHbs({
        layoutsDir: 'views/layouts/', 
        defaultLayout: 'main-layout',
        extname: 'hbs'
    })
);
app.set('view engine', 'hbs');

// Implement Pug
app.set('view engine', 'pug');
*/
app.set('views', 'views');


// Add Controller:
// const adminData = require('./routes/admin');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


/* Testing Database Connection:
db.execute('SELECT * FROM products')
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });
*/


// For Serving Files Statically (eg public folder): 
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use((req, res, next) => {
    console.log('This always runs!');
    next(); // Allows the request to continue to the next middleware in line
});

// Add Middleware for Retrieving User:
app.use((req, res, next) => {
    User.findById(1)
        .then(user => {
            req.user = user; //This will include .createProduct() method from Sequelize and will be used in admin.js
            next();
        })
        .catch(err => console.log(err));
});

// The order of this 2 app.use will matter if using router.use() in shop.js
// app.use('/admin', adminData.routes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);


/* Got moved to error.js:
app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
    res.status(404).render('404', {pageTitle: "Page Not Found!"});
});
*/
app.use(errorController.get404);

// Use Models to define Relationship:
Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {
    through: CartItem
});
Product.belongsToMany(Cart, {
    through: CartItem
});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {
    through: OrderItem
});

sequelize
    /* Before Adding Dummy User:
    // 'force' will reset the database with new relationship. 
    .sync({ force: true }) 
    .then(result => {
        console.log(result);
        app.listen(3000);
    })
    */
    // .sync({ force: true })
    .sync()
    .then(result => {
        return User.findById(1);
    })
    .then(user => {
        if (!user) {
            User.create({
                name: 'Francis',
                email: 'francispham89@gmail.com'
            });
        }
        return user;
    })
    .then(user => {
        console.log(user);
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })