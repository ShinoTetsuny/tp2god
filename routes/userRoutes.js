const express = require("express")
const router = express.Router()
const userController = require('../controllers/userControllers')
const middleware = require('../middleware/authentification')

router.get('/table', userController.createTableProduct)
router.get('/',middleware.authenticatorSuperAdmin, userController.getAllUser)
router.post('/register', userController.register)
router.post('/login', userController.login)


module.exports = router