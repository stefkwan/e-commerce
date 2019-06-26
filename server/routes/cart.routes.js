const router = require('express').Router()
const ControllerCarts = require('../controllers/cart.controller.js')
const isAuthenticated = require('../middleware/auth.js').authentication
const isAuthorized = require('../middleware/auth.js').authCart

router.delete('/', (req, res, next) => {
	const Cart = require('../models').Cart

	Cart
	.deleteMany()
	.then(result => {
		res.json('Cart collection cleared! ' + result.deletedCount);
	})
	.catch(function(err) {
		next(err);
	});
})

// /cart
router.use(isAuthenticated)
router.get('/', ControllerCarts.findOne)
router.post('/', ControllerCarts.create)

router.patch('/checkout', ControllerCarts.checkout)
router.patch('/add', isAuthorized, ControllerCarts.addProduct)
router.patch('/del', isAuthorized, ControllerCarts.delProduct)

module.exports = router