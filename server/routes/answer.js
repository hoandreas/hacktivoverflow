const router = require('express').Router()
const AnswerController = require('../controllers/AnswerController')
const { authentication, answerAuthorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', AnswerController.create)
router.get('/', AnswerController.findAll)
router.get('/:id', AnswerController.findOne)
router.patch('/upvote/:id', AnswerController.upvoteAnswer)
router.patch('/downvote/:id', AnswerController.downvoteAnswer)

router.use('/:id', answerAuthorization)
router.put('/:id', AnswerController.updateAnswer)

module.exports = router