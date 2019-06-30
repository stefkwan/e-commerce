const User = require('../models/').User
const Cart = require('../models/').Cart
const Product = require('../models/').Product

class ControllerProduct {
  static findAll(req, res, next) {
    Product.find()
    .then(result => {
      res.json(result)
    })
    .catch(next)
  }

  static findOne(req, res, next) {
    let id = req.params.id;
    Product.findOne({_id: id})
    .then(result => {
      res.json(result)
    })
    .catch(next)
  }

  static updateOne(req, res, next){
    let id = req.params.id;
    let {name, image, price, stock} = req.body
    let newValues = {name, image, price, stock} //user cannot change email

    Product.findOneAndUpdate({_id: id}, newValues, {new: true})
    .then(result => {
      res.json(result)
    })
    .catch(next)
  }

  static deleteOne(req, res, next){
    let productId = req.params.id
    let deletedProduct
    Product.findOneAndDelete({_id: productId})
    .then(deleted => {
      deletedProduct = deleted
      // update all carts that contain this product
      return Cart.find({products: productId})
    })
    .then (cartsArray => {
      // delete deletedProduct from all carts containing it
      cartsArray.forEach(cart => {
        let index = cart.products.indexOf(productId)
        cart.products.splice(index, 1)
        cart.count.splice(index, 1)
        cart.dateAdded.splice(index, 1)

        Cart.updateOne({_id: cart._id}, cart)
        .then(updatedCart => {
          // console.log({updatedCart})
        })
      })

      res.json(deletedProduct)
    })
    .catch(next)
  }

  static create(req, res, next){
    Product.create(req.body)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(next)
  }

  static uploadImage(req, res, next){
    try {
      if (req.file && req.file.gcsUrl) {
        return res.send(req.file.gcsUrl);
      }
      return res.status(500).send('Unable to upload');
    } catch (err){
      return res.send(err)
    }
  }

  static deleteImage(req, res, next){
    // console.log({productControllerReqBody:req.body})
    // console.log({req})
    return res.send("deleted image")
  }
}

module.exports = ControllerProduct