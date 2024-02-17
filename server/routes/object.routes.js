const Router = require('express')
const router = new Router()
const objectController = require('../controller/object.controller')


router.get('/getallobjects', objectController.getAllObjects)
router.post('/addnewobject', objectController.createObject)
router.delete('/deleteobject', objectController.deleteObject)
router.put('/updateobject', objectController.updateObject)
router.post('/getcurrentobject', objectController.getCurrentObject)


module.exports = router