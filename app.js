const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

// Add Error Controller:
const errorController = require('./controllers/error');

// Add MongoDB Database:
const mongoConnect = require('./util/database').mongoConnect;


const app = express();


// Implement Ejs:
app.set('view engine', 'ejs');

app.set('views', 'views');


// Add Controller:
// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
``
// For Serving Files Statically (eg public folder): 
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));


app.use((req, res, next) => {
    console.log('This always runs!');
    next(); // Allows the request to continue to the next middleware in line
});

// Add Middleware for Retrieving User:
app.use((req, res, next) => {});

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
   app.listen(3000);
})