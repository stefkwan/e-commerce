const User = require('../models/').User
const Cart = require('../models/').Cart
const Product = require('../models/').Product
const verifyToken = require('../helpers/jwt.js').verifyToken

const authentication = (req, res, next) => {
	let token = req.headers.access_token
	if(token) {
		try{
			let decode = verifyToken(token).input
			if(decode){
				req.decode = decode
				next()
			} else {
				//wrong token
				next({status: 403}) //forbidden
			}
		} catch (e){
			next({status: 400})
		}
	} else {
		//no token
		next({status: 403}) //forbidden
	}
}

//auth for product
const authProduct = (req, res, next) => {
	let userEmail = req.decode.email
	//only let admin change, admin declared here
	let admins = ["admin@ecommerce.com", "admin1@ecommerce.com", "admin2@ecommerce.com"]
	if (admins.include(userEmail)){
		//logged in user is an admin
		next()
	} else {
		next({status: 403})
	}
}

//authorization for cart
const authCart = (req, res, next) => {
	console.log("authCart middleware")
	let userId = req.decode.id

	Cart.findOne({userId: userId, status: ""})
		.then(found => {
			console.log("found cart for current user", found)
			if (!found) {
				throw ({status: 404}) //cart not found
			} else if (found.userId == userId){
				//token's data matches userId params sent
				next()
			} else {
				//wrong user
				throw ({status:401}) //unauthorized
			}
		})
		.catch(next)
}

//authorization user
const authUser = (req, res, next) => {
	let userId = req.decode.id //usually from params

	if (userId){
		User.findOne({_id: userId})
			.then(found => {
				if (!found) {
					throw ({status: 404}) //user not found
				} else if (found._id == req.decode.id){
					//user is registered in our database
					next()
				} else {
					//wrong user
					throw ({status:401}) //unauthorized
				}
			})
			.catch(next)
	} else {
		//no user id parameters
		next({status: 404}) //page not found
	}
}

module.exports = {
	authentication,
	authUser,
	authCart,
	authProduct
}