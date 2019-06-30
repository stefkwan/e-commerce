const router = require('express').Router()
const controllerProduct = require('../controllers/product.controller.js')
const isAuthenticated = require('../middleware/auth.js').authentication
const isAuthorized = require('../middleware/auth.js').authProduct

// router.delete('/', (req, res, next) => {
// 	const Product = require('../models').Product

// 	Product
// 	.deleteMany()
// 	.then(result => {
// 		res.json('Product collection cleared! ' + result.deletedCount);
// 	})
// 	.catch(function(err) {
// 		next(err);
// 	});
// })

// /products
router.get('/', controllerProduct.findAll)

router.use(isAuthenticated)
router.get('/:id', controllerProduct.findOne)

router.use(isAuthorized)
router.post('/', controllerProduct.create)
router.patch('/:id', controllerProduct.updateOne)
router.delete('/:id', controllerProduct.deleteOne)

const gcsMiddlewares = require('../middleware/google-cloud-middleware.js')
const Multer = require('multer');

const multer = Multer({
	storage: Multer.MemoryStorage,
		limits: {
		  fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
		},
	});

router.post('/uploadImage', 
	multer.single('image'), 
	gcsMiddlewares.sendUploadToGCS, 
	controllerProduct.uploadImage)

router.post('/deleteImage',
	gcsMiddlewares.deleteUploadFromGCS)

module.exports = router