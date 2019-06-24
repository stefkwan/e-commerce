const router = require('express').Router()
const ControllerCarts = require('../controllers/cart.controller.js')
const isAuthenticated = require('../middleware/auth.js').authentication
const isAuthorized = require('../middleware/auth.js').authCart
// /cart
router.use(isAuthenticated)
router.get('/', ControllerCarts.findOne)
router.post('/', ControllerCarts.create)
router.post('/checkout', ControllerCarts.checkout)

router.patch('/add', isAuthorized, ControllerCarts.addProduct)
router.patch('/del', isAuthorized, ControllerCarts.delProduct)

module.exports = router