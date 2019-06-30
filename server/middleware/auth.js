const User = require('../models/').User
const Cart = require('../models/').Cart
const Product = require('../models/').Product
const verifyToken = require('../helpers/jwt.js').verifyToken
let admins = ["admin@ecommerce.com", "admin1@ecommerce.com", "admin2@ecommerce.com"]
	
const authentication = (req, res, next) => {
	let token = req.headers.access_token
	// console.log({token})
	if(token) {
		try{
			let decode = verifyToken(token).input
			if(decode){
				req.decode = decode
				next()
			} else {
				//wrong token
				next({status: 403, message:"forbidden access, you are not the owner of this cart"}) //forbidden
			}
		} catch (e){
			next({status: 400, message:"error at user token authentication"})
		}
	} else {
		//no token
		next({status: 403, message:"user not logged in"}) //forbidden
	}
}

//auth for product
const authProduct = (req, res, next) => {
	let userEmail = req.decode.email
	//only let admin change, admin declared above
	User.findOne({email: userEmail})
	.then( result => {
		if (result){
			if (admins.includes(userEmail)){
				next()//logged in user is an admin
			} else {
				next({status: 403, message:"you are not an admin"})
			}
		} else {
			next({status: 403, message:"only admins can change products"})
		}
	})
	.catch(next)
}

//authorization for cart
const authCart = (req, res, next) => {
	let userId = req.decode.id

	Cart.findOne({userId: userId, status: ""})
		.then(found => {
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

const authAdmin = (req, res, next) => {
	let userEmail = req.decode.email
	User.findOne({email: userEmail})
	.then( result => {
		if (result){
			if (admins.includes(userEmail)){
				next()//logged in user is an admin
			} else {
				next({status: 403, message:"you are not an admin"})
			}
		} else {
			next({status: 403, message:"only admins can access this page"})
		}
	})
	.catch(next)
}

module.exports = {
	authentication,
	authUser,
	authCart,
	authProduct,
	authAdmin
}