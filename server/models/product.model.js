const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/bcrypt.js').hashPassword

const userSchema = new Schema({
	name: String,
	image: {
		type: String,
		default: "no image"
	},
	price: {
		type: Number,
		default: 0
	},
	stock: {
		type: Number,
		default: 0
	}
});

const Product = mongoose.model('Product',userSchema)

module.exports = Product