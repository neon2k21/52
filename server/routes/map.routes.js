const Router = require('express')
const router = new Router()
const objectController = require('../controller/object.controller')


router.get('/getMap', objectController.getAllObjects)
router.post('/setMapRoute', objectController.createObject)
router.delete('/clearMapRoute', objectController.deleteObject)
router.put('/updateobject', objectController.updateObject)
router.post('/getcurrentobject', objectController.getCurrentObject)


module.exports = router