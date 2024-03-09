const Router = require('express')
const router = new Router()
const publicationController = require('../controller/publication.controller')


router.post('/createpublication', publicationController.createPublication)
router.get('/getallpublication',publicationController.getAllPublications)
router.post('/getallpublicationbyfilter',publicationController.getallpublicationbyfilter)
router.put('/approvepublication', publicationController.approvepublication)
router.delete('/deletepublication', publicationController.deletepublication)
router.post('/putlikepublication',publicationController.putlikepublication)
router.post('/writecommentpublication',publicationController.writecommentpublication)
router.post('/deletelikepublication',publicationController.deletelikepublication)
router.post('/deletecommentpublication',publicationController.deletecommentpublication)


module.exports = router