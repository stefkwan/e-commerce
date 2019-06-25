const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
	products: [{ 
		type: Schema.Types.ObjectId, 
		ref: 'Products' 
	}],
	count: [{
		type: Number,
		default: 0
	}],
	dateAdded: [{
		type: Date,
		default: new Date()
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