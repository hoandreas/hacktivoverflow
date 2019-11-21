const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')
const { authentication, questionAuthorization } = require('../middlewares/auth')

router.get('/', QuestionController.findAll)
router.get('/allUsersQuestions', authentication, QuestionController.findAllUserQuestion)
router.get('/:id', QuestionController.findOne)
router.use(authentication)
router.post('/', QuestionController.create)
router.patch('/upvote/:id', QuestionController.upvoteQuestion)
router.patch('/downvote/:id', QuestionController.downvoteQuestion)

router.use('/:id', questionAuthorization)
router.put('/:id', QuestionController.updateQuestion)
router.delete('/:id', QuestionController.deleteQuestion)

module.exports = router