const router = require('express').Router()
const userRoute = require('./user')
const questionRoute = require('./question')
const answerRoute = require('./answer')

router.use('/users', userRoute)
router.use('/questions', questionRoute)
router.use('/answers', answerRoute)
module.exports = router