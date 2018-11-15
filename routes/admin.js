const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send(
        '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></input></form>'
    );
});

// Using "post" for "use" will get into this route accidentally:
router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;