const http = require('http');
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const expressHbs = require('express-handlebars');

const adminData = require('./routes/admin');
const shopRoute = require('./routes/shop');

const app = express();

// to parse the form data
app.use(bodyparser.urlencoded());

/**
 *  templeting engine configurations 
 *  pug
 *  handlebars
 *  ejs
*/

/**
 * pug
 */

//set the templating engine as pug
//app.set('view engine', 'pug');

//set the view(template) directory to views
//app.set('views', 'views');

/**
 * handlebars
 * Incase of handlebars, we can't have any logic in the templte, 
 * the logics has to be in NodeJS and the result only we can pass to temlate
 */

//Incase of handlebars we need to define the engine
/*app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );*/

//set the templating engine as handlebars
//app.set('view engine', 'hbs');

//set the view(template) directory to views
//app.set('views', 'views');

/**
 * ejs
 */
//set the templating engine as handlebars
app.set('view engine', 'ejs');

//set the view(template) directory to views
app.set('views', 'views');

/**
 * templet engine section ends
 */

// to give public read access to the public folder (eg: for static css files and all)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoute);

app.use((req, res, next) => {
    /*the __dirname will get the directory path to the root folder, 
    * if we are any subfolder we should add an another parameter (second in the list),
    */

    // return html file (without any dynamic data)
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

    // It will return the 404 pug file with dynamic data
    res.status(404).render('404', {pageTitle: 'Page not found'});
});
//const server = http.createServer(app);
//server.listen(3000);
app.listen(3000);
