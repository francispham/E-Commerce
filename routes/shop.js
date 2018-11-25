const express = require('express');
const path = require('path');

// Add Controller:
const shopController = require('../controllers/shop');
// const rootDir = require('../util/path');
// const adminData = require('./admin');

const router = express.Router();

router.get('/', shopController.getIndex);
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

router.get('/products', shopController.getProducts);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;