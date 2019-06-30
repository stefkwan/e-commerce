const router = require('express').Router()
const ControllerCarts = require('../controllers/cart.controller.js')
const isAuthenticated = require('../middleware/auth.js').authentication
const isAuthorized = require('../middleware/auth.js').authCart

// /cart
router.use(isAuthenticated)
router.get('/', ControllerCarts.findOne)
router.post('/', ControllerCarts.create)

router.use(isAuthorized)
router.patch('/checkout', ControllerCarts.checkout)
router.patch('/add', ControllerCarts.addProduct)
router.patch('/del', ControllerCarts.delProduct)

router.delete('/', ControllerCarts.delete)

module.exports = router