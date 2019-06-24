const router = require('express').Router()
const controllerUser = require('../controllers/controlUsers')
const isAuthenticated = require('../middleware/auth.js').authentication
const isAuthorized = require('../middleware/auth.js').authUser

// /users
router.get('/', controllerUser.findAll)
router.post('/', controllerUser.create)
router.post('/login', controllerUser.login)

router.use(isAuthenticated)
router.patch('/', isAuthorized, controllerUser.update)

module.exports = router