const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
	producs: [{
		type: String,
		default: "no title"
	}],
	count: [{
		type: String,
		default: "no content"
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