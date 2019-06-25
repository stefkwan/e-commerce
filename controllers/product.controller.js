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
    Product.find({_id: id})
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
    Product.findOneAndDelete({_id: req.params.id})
    .then(deleted => {
      res.json(deleted)
    })
    .catch(next)
  }

  static create(req, res, next){
    Product.create(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(next)
  }
}

module.exports = ControllerProduct