const express = require("express")
const router = express.Router()
const godController = require('../controllers/godControllers')
const middleware = require('../middleware/authentification')

router.get('/',middleware.authenticatorSuperAdmin,middleware.authenticatorGolmon, godController.getAllGods)
router.get('/:id',middleware.authenticatorGod, godController.getGod)
router.get('/users/:id', middleware.authenticatorAdmin, godController.getUserOfGod)
router.post('/',middleware.authenticatorSuperAdmin, godController.create)
router.patch('/:id',middleware.authenticatorAdmin, godController.update)
router.delete('/:id', godController.delete)

module.exports = router