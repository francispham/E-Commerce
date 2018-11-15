const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    console.log('This always runs!');
    next(); // Allows the request to continue to the next middleware in line
});

// The order of this 2 app.use will matter if using router.use() in shop.js
app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page Not Found</h1>')
})

app.listen(3000);