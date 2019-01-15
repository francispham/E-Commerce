// When Add models:
// const products = [];
const Product = require('../models/product');
const Cart = require ('../models/cart');

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
    //Fetching Data from File:
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
    */
   /* Before Sequelize
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list', {
                prods: rows,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(err => console.log(err));
    */
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    // console.log(prodId);
    /*
    // Fetching single Data by Id from File:
    Product.findById(prodId, product => {
        // console.log(product);
        res.render('shop/product-detail', {
            product: product, 
            pageTitle: product.title,
            path: '/products'
        });
    });
    // res.redirect('/');
    */

    // Fetching single Data by Id in Database:
    /* Before Sequelize:
    Product.findById(prodId)
        .then(([product]) => {
            res.render('shop/product-detail', {
                product: product[0],
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
    */    
    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
    /* Alternative Approach:
    Product.findAll({ where: { id: prodId } })
        .then(products => {
            res.render('shop/product-detail', {
                product: products[0],
                pageTitle: products[0].title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
    */
};

exports.getIndex = (req, res, next) => {
    /*
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
    */
   /* Before Sequelize:
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index', {
                prods: rows,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => console.log(err));
    */
   Product.findAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart =>{
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cart.products.find(prod => prod.id === product.id)) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    // console.log(prodId);
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};