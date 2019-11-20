const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswerController {
    static create (req, res, next) {
        let newAnswer = null
        let objAnswer = {
            desc: req.body.desc,
            question_id: req.body.question_id,
            user_id: req.loggedUser.id
        }
        Answer.create(objAnswer)
            .then(answer => {
                newAnswer = answer
                return Question.updateOne({ _id: req.body.question_id }, { $push: { answers: answer._id }})
            })
            .then(question => {
                res.status(200).json(newAnswer)
            })
            .catch(next)
    }

    static findAll (req, res, next) {
        let { user_id } = req.body
        Answer.find({ user_id })
            .then(answers => {
                res.status(200).json(answers)
            })
            .catch(next)
    }

    static findOne (req, res, next) {
        let { id } = req.params
        Answer.findById({ _id: id })
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(next)
    }

    static updateAnswer (req, res, next) {
        let { id } = req.params
        let { desc } = req.body
        Answer.findByIdAndUpdate({ _id: id }, { desc })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }

    // static deleteAnswer (req, res, next) {
    //     let { answer_id } = req.params
    //     Answer.findByIdAndDelete( answer_id )
    //         .then(result => {
    //             return Question.updateOne({ _id: result.question_id })
    //         })
    //         .then(question => {
    //             res.status(200).json(question)
    //         })
    //         .catch(next)
    // }
}

module.exports = AnswerController