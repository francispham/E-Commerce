const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

// Add Error Controller:
const errorController = require('./controllers/error');

const path = require('path');
const rootDir = require('./util/path');

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

// For Serving Files Statically (eg public folder): 
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    console.log('This always runs!');
    next(); // Allows the request to continue to the next middleware in line
});

// The order of this 2 app.use will matter if using router.use() in shop.js
// app.use('/admin', adminData.routes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);

/* Got moved to error.js :
app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
    res.status(404).render('404', {pageTitle: "Page Not Found!"});
});
*/
app.use(errorController.get404);

app.listen(3000);