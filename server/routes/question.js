const router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')
const { authentication, questionAuthorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', QuestionController.create)
router.get('/', QuestionController.findAll)
router.get('/allUsersQuestions', QuestionController.findAllUserQuestion)
router.get('/:id', QuestionController.findOne)
router.patch('/upvote/:id', QuestionController.upvoteQuestion)
router.patch('/downvote/:id', QuestionController.downvoteQuestion)

router.use('/:id', questionAuthorization)
router.put('/:id', QuestionController.updateQuestion)
router.delete('/:id', QuestionController.deleteQuestion)

module.exports = router