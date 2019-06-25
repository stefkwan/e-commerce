const User = require('../models/').User
const Cart = require('../models/').Cart
const Product = require('../models/').Product

class ControllerCart {
  
	static findOne(req, res, next){
		let userId = req.decode.id
		Cart.find({userId: userId, status: ""})
		.then( result => {
			res.json(result)
		})
		.catch(next)
	}

	static create(req, res, next){
		let userId = req.decode.id
		Cart.create({userId: userId})
		.then( result => {
			res.status(201).json(result)
		})
		.catch(next)
	}

	static checkout(req, res, next){
		let userId = req.decode.id
		Cart.findOneAndUpdate(
			{userId: userId, status: ""}, 
			{status: "checked-out"})
		.then(result => {
			res.json(result)
		})
		.catch(next)
	}

	static addProduct(req, res, next){
		let userId = req.decode.id
		let productId = req.body.productId

		let currentCart

		Cart.findOne({userId: userId, status: ""})
		.then(result => {
			currentCart = result;
			return Product.findOne({_id: productId})
		})
		.then(product => {
			//if not valid product, throw error
			if (product == null || product == undefined){
				throw new Error("invalid product")
			}
			//if already in cart, increment count
			if (currentCart.products.includes(productId)){
				let itemIndex = currentCart.products.indexOf(productId)
				currentCart.count[itemIndex]++

				res.json(currentCart)
			} else { //first time item added to cart
				currentCart.products.push(productId)
				currentCart.count.push(1)
				currentCart.dateAdded.push(new Date())

				res.json(currentCart)
			}
		})
		.catch(next)
	}

	static delProduct(req, res, next){
		let userId = req.decode.id
		let productId = req.body.productId

		let currentCart

		Cart.findOne({userId: userId, status: ""})
		.then(result => {
			currentCart = result;
			return Product.findOne({_id: productId})
		})
		.then(product => {
			//if not valid product, throw error
			if (product == null || product == undefined){
				throw new Error("invalid product")
			}
			//if already in cart, decrement count
			if (currentCart.products.includes(productId)){
				let itemIndex = currentCart.products.indexOf(productId)
				currentCart.count[itemIndex]--

				res.json(currentCart)
			} else { //nothing to delete

				res.json(currentCart)
			}
		})
		.catch(next)
		
	}
}

module.exports = ControllerCart