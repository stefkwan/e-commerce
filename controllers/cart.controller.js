const User = require('../models/').User
const Cart = require('../models/').Cart
const Product = require('../models/').Product

class ControllerCart {
  
	static findOne(req, res, next){
		let userId = req.decode.id
		Cart.findOne({userId: userId, status: ""})
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
		let updatedCart = {}
		Cart.findOneAndUpdate(
			{userId: userId, status: ""}, 
			{status: "checked-out"}, 
			{new: true})
		.then(result => {
			updatedCart = result
			console.log(result)
			console.log("==========")
			//then create new cart for the user
			return Cart.create({userId: userId})
			// res.json(result)
		})
		.then(newEmptyCart => {
			res.json(updatedCart)
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
			} else { //first time item added to cart
				currentCart.products.push(productId)
				currentCart.count.push(1)
				currentCart.dateAdded.push(new Date())

			}

			return Cart.update({_id: currentCart._id}, currentCart, {new:true})
		})
		.then(updatedCart => {
			res.json(currentCart)
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
				if (currentCart.count[itemIndex] == 0){
					//remove product from cart if count is 0
					currentCart.products.splice(itemIndex, 1)
					currentCart.count.splice(itemIndex, 1)
					currentCart.dateAdded.splice(itemIndex, 1)
				}

				res.json(currentCart)
			} else { //nothing to delete

				res.json(currentCart)
			}
		})
		.catch(next)
		
	}
}

module.exports = ControllerCart