const express = require('express');

const router = express.Router();

// Because using app.use('/admin', adminRoutes) in app.js. These 2 routes will be come:
// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.send(
        '<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></input></form>'
        );
    });
    
// /admin/add-product => POST
// Using "post" for "use" will get into this route accidentally:
router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;