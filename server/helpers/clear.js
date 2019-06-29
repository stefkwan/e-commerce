let clearDb = {}

const User = require('../models/user.model');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

clearDb.clearUser = function() {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testWin' ) {
    return User
      .deleteMany()
  }
}

clearDb.clearCart = function() {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testWin' ) {
    return Cart
      .deleteMany()
  }
}

clearDb.clearProduct = function() {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testWin' ) {
    return Product
      .deleteMany()
  }
}


module.exports = clearDb;
