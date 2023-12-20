const express = require("express")
const router = express.Router()
const roleController = require('../controllers/roleControllers')
const middleware = require('../middleware/authentification')

router.get('/',middleware.authenticatorSuperAdmin, roleController.getAllRoles)
router.get('/:id',middleware.authenticatorSuperAdmin, roleController.getUserOfRole)
router.post('/',middleware.authenticatorSuperAdmin, roleController.create)
router.patch('/:id',middleware.authenticatorSuperAdmin, roleController.update)
router.delete('/:id',middleware.authenticatorSuperAdmin, roleController.delete)

module.exports = router