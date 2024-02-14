const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')

router.post('/user', userController.createUser)
router.post('/getuser', userController.getUser)
router.post('/updateuser',userController.updateUser)
router.delete('/user', userController.deleteUser)

module.exports = router

