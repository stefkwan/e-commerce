const router = require('express').Router()
const controllerProduct = require('../controllers/product.controller.js')
const isAuthenticated = require('../middleware/auth.js').authentication
const isAuthorized = require('../middleware/auth.js').authProduct

router.delete('/', (req, res, next) => {
	const Product = require('../models').Product

	Product
	.deleteMany()
	.then(result => {
		res.json('Product collection cleared! ' + result.deletedCount);
	})
	.catch(function(err) {
		next(err);
	});
})

// /products
router.use(isAuthenticated)
router.get('/', controllerProduct.findAll)
router.get('/:id', controllerProduct.findOne)

// router.use(isAuthorized)
router.post('/', controllerProduct.create)
router.patch('/:id', controllerProduct.updateOne)
router.delete('/:id', controllerProduct.deleteOne)

module.exports = router