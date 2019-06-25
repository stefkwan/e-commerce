let clearDb = {}

const User = require('../models/user.model');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

clearDb.clearUser = function() {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testWin' ) {
    User
      .deleteMany({})
      .then(function() {
        console.log('Users collection cleared!');
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}

clearDb.clearCart = function() {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testWin' ) {
    Cart
      .deleteMany({})
      .then(function() {
        console.log('Cart collection cleared!');
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}

clearDb.clearProduct = function() {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testWin' ) {
    Product
      .deleteMany({})
      .then(function() {
        console.log('Products collection cleared!');
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}


module.exports = clearDb;
