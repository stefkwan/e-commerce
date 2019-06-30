const router = require('express').Router()
const controllerUser = require('../controllers/user.controller.js')
const isAuthenticated = require('../middleware/auth.js').authentication
const isAuthorized = require('../middleware/auth.js').authUser
const isAdmin = require('../middleware/auth.js').authAdmin

// router.delete('/', (req, res, next) => {
// 	const User = require('../models').User

// 	User
// 	.deleteMany()
// 	.then(result => {
// 		res.json('Users collection cleared! ' + result.deletedCount);
// 	})
// 	.catch(function(err) {
// 		next(err);
// 	});
// })

// /users
router.post('/', controllerUser.create) //register
router.post('/login', controllerUser.login)

router.use(isAuthenticated)
router.patch('/', isAuthorized, controllerUser.update)
router.get('/history', isAuthorized, controllerUser.findHistory)

router.get('/', isAdmin, controllerUser.findAll)
router.get('/history/:id', isAdmin, controllerUser.findHistory)

module.exports = router
