// When Add models:
// const products = [];
const Product = require('../models/product');

// For Render add-product.ejs:
exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

// For Post New Product:
exports.postAddProduct = (req, res, next) => {
    // Got moved to models:
    // products.push({ title: req.body.title });
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

// For Render shop.ejs page:
exports.getProducts = (req, res, next) => {
    /* We don't need this because of 1st code line:
    const products = adminData.products;
    //When Add models
    const products = Product.fetchAll(); 
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
    */
    //Fetching Data from File:
    Product.fetchAll(products => {
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};