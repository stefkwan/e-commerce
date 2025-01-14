const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
	products: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Product'
	}],
	count: [{
		type: Number
	}],
	dateAdded: [{
		type: Date
	}],
	status: {
		type: String,
		default: ""
	},
	userId: { 
		type: Schema.Types.ObjectId, 
		ref: 'User' 
	}
});

const Cart = mongoose.model('Cart',cartSchema)

module.exports = Cart