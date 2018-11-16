const express = require('express');

const path = require('path');
const rootDir = require('../util/path');

const router = express.Router();

// Because using app.use('/admin', adminRoutes) in app.js. These 2 routes will be come:
// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    });
    
// /admin/add-product => POST
// Using "post" for "use" will get into this route accidentally:
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;