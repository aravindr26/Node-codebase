const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../utils/path');
const adminData = require('./admin');

router.get('/', (req,res,next) => {
    const products = adminData.products;

    /**
     * default html returned back
     */
    //This will return the html file
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    /**
     * pug
     */
    //it will render the pug file to display the products
    //res.render('shop', {prods: products, pageTitle: 'Shop', path: '/'});

    /**
     * handlebars
     */
    
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
    
})

module.exports = router;
