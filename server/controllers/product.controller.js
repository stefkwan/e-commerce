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
    Product.findOneAndDelete({_id: req.params.id})
    .then(deleted => {
      res.json(deleted)
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
    console.log({productControllerReq:req})
    return res.send("delete image at controller")
  }
}

module.exports = ControllerProduct