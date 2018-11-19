const express = require('express');

const path = require('path');

// Add Controllers:
const productsController = require('../controllers/products');
// const rootDir = require('../util/path');
// const products = []; 

const router = express.Router();


// Because using app.use('/admin', adminRoutes) in app.js. These 2 routes will be come:
router.get('/add-product', productsController.getAddProduct);
router.post('/add-product', productsController.postAddProduct);

/* When (req,res, next) => () got moved to product.js:
// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', { 
        pageTitle: 'Add Product', 
        path: '/admin/add-product',
        // For Handlebar main-layout.hbs to work:
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
});
// /admin/add-product => POST
// Using "post" for "use" will get into this route accidentally:

router.post('/add-product', (req, res, next) => {
    // console.log(req.body);
    products.push({ title: req.body.title });
    res.redirect('/');
});

exports.routes = router;
exports.products = products;
*/

exports.routes = router;