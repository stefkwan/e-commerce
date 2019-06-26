const router = require('express').Router()
const userRoutes = require('./user.routes')
const cartRoutes = require('./cart.routes')
const productRoutes = require('./product.routes')

router.use('/users', userRoutes)
router.use('/cart', cartRoutes)
router.use('/products', productRoutes)

module.exports = router