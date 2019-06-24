const router = require('express').Router()
const connect = require('../helpers/connect.js')
const userRoutes = require('./user.routes')
const cartRoutes = require('./cart.routes')

//connect to mongoose
router.use((req,res,next) => {
	connect()
		.then(() => next())
		.catch(next)
})

router.use('/users', userRoutes)
router.use('/cart', cartCoutes)

module.exports = router