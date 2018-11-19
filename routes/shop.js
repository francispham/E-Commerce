const express = require('express');
const path = require('path');

// Add Controller:
const productsController = require('../controllers/products');
// const rootDir = require('../util/path');
// const adminData = require('./admin');

const router = express.Router();

router.get('/', productsController.getProducts);
/* When (req,res, next) => () got moved to product.js:
router.get('/', (req, res, next) => {
    console.log('shop.js', adminData.products);
    const products = adminData.products;
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    // res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' });
    // For Handlebar to work on shop.hbs: 
    res.render('shop', { 
        prods: products, 
        pageTitle: 'Shop', 
        path: '/', 
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
});
*/
module.exports = router;