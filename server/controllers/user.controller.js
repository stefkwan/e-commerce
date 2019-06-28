const User = require('../models/').User
const Cart = require('../models/').Cart
const Product = require('../models/').Product
const verifyPassword = require('../helpers/bcrypt.js').verifyPassword
const generateToken = require('../helpers/jwt.js').generateToken
const verifyToken = require('../helpers/jwt.js').verifyToken
// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(bash.bashrc.GOOGLE_CLIENT_ID);

class ControllerUser {
  static update(req, res, next){
    let userEmail = req.decode.email
    let {name, address, password} = req.body
    let input = {name, address, password} //user cannot change email

    User.findOneAndUpdate({email: userEmail}, input, {new: true})
    .then(updated => {
      res.json(updated)
    })
    .catch(next)
  }

  static findAll(req, res, next) {
    User.find()
    .then(result => {
      res.json(result)
    })
    .catch(next)
  }

  static findHistory(req, res, next){
    let userIdbyAdmin = req.params.id
    let userIdbyUser = req.decode.id
    // find all checked-out carts from said user if id params given (is admin)
    // or if logged in user wants to check their own history
    if (userIdbyAdmin || userIdbyUser) {
      let userId = userIdbyAdmin || userIdbyUser
      Cart.find({userId: userId, status: "checked-out"})
      .then ( result => {
        res.json(result)
      })
      .catch(next)
    }
  }

  static create(req, res, next) {
    const { name, email, address, password } = req.body
    const input = { name, email, address, password }

    User.create(input)
    .then(result => {
      //also create an empty cart for the user at client
      res.status(201).json(result)
    })
    .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body
    const input = { email, password }

    User.findOne({email: input.email})
    .then(user => {
      if(user){
        let check = verifyPassword(input.password, user.password)
        if(check) {
          let token = generateToken({id: user._id, email: user.email})
          res.json({access_token: token, name: user.name})
        } else {
          throw {status: 400, message: 'Wrong password'}
        }
      } else {
        throw {status: 400, message: 'Wrong email'}
      }
    })
    .catch(next)
  }
}

module.exports = ControllerUser