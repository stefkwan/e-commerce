const router = require('express').Router()
const controllerUser = require('../controllers/user.controller.js')
const isAuthenticated = require('../middleware/auth.js').authentication
const isAuthorized = require('../middleware/auth.js').authUser

router.delete('/', (req, res, next) => {
	const User = require('../models').User

	User
	.deleteMany()
	.then(result => {
		res.json('Users collection cleared! ' + result.deletedCount);
	})
	.catch(function(err) {
		next(err);
	});
})

// /users
router.get('/', controllerUser.findAll)
router.post('/', controllerUser.create)
router.post('/login', controllerUser.login)

router.use(isAuthenticated)
router.patch('/', isAuthorized, controllerUser.update)


module.exports = router