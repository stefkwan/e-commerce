const User = require('../models/').User
const Cart = require('../models/').Cart
const Product = require('../models/').Product

class ControllerCart {
  
	static findOne(req, res, next){
		let userId = req.decode.id
		Cart.findOne({userId: userId, status: ""})
		.populate('products')
		.exec(function (err, cart) {
			if(err){
				next(err)
			} else {
			  res.json(cart)
			}
		})
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
		Cart.findOne({userId: userId, status: ""})
		.then(foundCart => {
			if (foundCart.products.length > 0){
				foundCart.status = "checked-out"
				updatedCart = foundCart
				return Cart.updateOne({_id: foundCart._id}, 
						{status: "checked-out"}, 
						{new: true})
			} else {
				//do not checkout
				throw new Error("cart is empty, cannot checkout")
			}
		})
		.then(result => {
			res.json(updatedCart)
			//at client, create new cart for the user, and update the products' stocks
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
				if(product.stock < currentCart.count[itemIndex]){
					//product stock is not enough, cancel adding more stock
					currentCart.count[itemIndex]--
				}
			} else { //first time item added to cart
				currentCart.products.push(productId)
				currentCart.count.push(1)
				currentCart.dateAdded.push(new Date())
			}

			return Cart.updateOne({_id: currentCart._id}, currentCart, {new:true})
		})
		.then(updatedCart => {
			res.status(200).json(currentCart)
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

			} // else //nothing to delete

			return Cart.updateOne({_id: currentCart._id}, currentCart, {new:true})
		})
		.then(updatedCart => {
			res.status(200).json(currentCart)
		})
		.catch(next)
		
	}
}

module.exports = ControllerCart