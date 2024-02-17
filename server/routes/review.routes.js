const Router = require('express')
const router = new Router()
const reviewController = require('../controller/review.controller')

router.post('/createreview', reviewController.createReview)

router.get('/getallreviews', reviewController.getAllReviews)

router.post('/getcurrentreview', reviewController.getCurrentReview)

router.delete('/deleteeview', reviewController.deleteReview)

router.put('/applyreview', reviewController.applyReview)

module.exports = router