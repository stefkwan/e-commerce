let clearDb = {}

const User = require('../models/user.model');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

clearDb.clearUser = function() {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testWin' ) {
    return User
      .deleteMany()
      // .then(result => {
      //   console.log('Users collection cleared!', result.deletedCount);
      // })
      // .catch(function(err) {
      //   console.log(err);
      // });
  }
}

clearDb.clearCart = function() {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testWin' ) {
    return Cart
      .deleteMany()
      // .then(result => {
      //   console.log('Cart collection cleared!', result.deletedCount);
      // })
      // .catch(function(err) {
      //   console.log(err);
      // });
  }
}

clearDb.clearProduct = function() {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testWin' ) {
    return Product
      .deleteMany()
      // .then(result => {
      //   console.log('Products collection cleared!', result.deletedCount);
      // })
      // .catch(function(err) {
      //   console.log(err);
      // });
  }
}


module.exports = clearDb;
