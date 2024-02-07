const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('655375320b259b26a8ab412c')
    .then(user => {
      let cart = {};
      if(!user.cart) {
        cart.items = [];
      } else {
        cart = user.cart;
      }
      req.user = new User(user.name, user.email, cart, user._id);
      next();
    })
    .catch(err => console.log(err));
    
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  console.log('server started');
  app.listen(3000);
});
