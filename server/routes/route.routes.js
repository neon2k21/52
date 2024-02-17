const Router = require('express')
const router = new Router()
const routeController = require('../controller/route.controller')


router.post('/createroute', routeController.createRoute)
router.post('/getroute', routeController.getRoute)
router.post('/markroute', routeController.updateRating)
router.post('/deleteroute', routeController.deleteRoute)



module.exports = router