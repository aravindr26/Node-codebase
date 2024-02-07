const express = require('express');
const path =  require('path');
const router = express.Router();

const rootDir = require('../utils/path');
const products = [];

router.post('/add-product', (req, res, next)=> {
    products.push({title: req.body.title});
    res.redirect('/');
});

router.get('/add-product', (req, res, next)=> {
    /*
    *  '../ parameter in the path.join is to point to the views folder, as currently we are on routes folder
    *  if we need to navigate to the views, we should come out of routes, that we have to explicitly tell path
    *  res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    */

    /**
     * Rendering default static html file
     */
    //it will return html file
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    /**
     * pug
     */
    //it will return the pug file, with the product data
    //res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product'})

    /**
     * handlebars
     */
    res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true });
});



module.exports = {
    routes: router,
    products: products
}
