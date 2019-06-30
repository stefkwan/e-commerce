const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/bcrypt.js').hashPassword

const productSchema = new Schema({
	name: {
		type: String,
		default: "no name"
	},
	image: {
		type: String,
		default: "no image"
	},
	price: {
		type: Number,
		default: 0,
		min: [0, 'It is already free. It cannot be a negative price.']
	},
	stock: {
		type: Number,
		default: 0,
		min: [0, 'Min. stock is out of stock (for pre-sale purposes) to register new product']
	}
});

const Product = mongoose.model('Product', productSchema)

module.exports = Product