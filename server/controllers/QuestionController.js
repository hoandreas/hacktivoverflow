const Question = require('../models/question')

class QuestionController {
    static create (req, res, next) {
        const user_id = req.loggedUser.id
        let objQuestion = {
            title: req.body.title,
            desc: req.body. desc,
            user_id: user_id
        }
        Question.create(objQuestion)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }

    static findAll (req, res, next) {
        Question.find()
            .populate('answers')
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(next)
    }

    static findAllUserQuestion (req, res, next) {
        const user_id = req.loggedUser.id
        Question.find({ user_id: user_id })
            .populate('user_id')
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(next)
    }

    static findOne (req, res, next) {
        const { id } = req.params
        Question.findById({ _id: id })
            .populate('answers')
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
    }

    static updateQuestion (req, res, next) {
        let { id } = req.params
        let { title, desc } = req.body
        Question.findByIdAndUpdate({ _id: id }, { title, desc })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }

    static deleteQuestion (req, res, next) {
        const { id } = req.params
        Question.deleteOne({ _id: id })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }

    // static upvoteQuestion (req, res, next) {
    //     const { id } = req.params
    //     const voter_id = req.loggedUser.id
    //     Question.updateOne({ _id: id }, { $push: { upvotes: voter_id }})
    //         .then(result => {
    //             res.status(200).json(result)
    //         })
    //         .catch(next)
    // }

    // static downvoteQuestion (req, res, next) {
    //     const { id } = req.params
    //     const voter_id = req.loggedUser.id
    //     Question.updateOne({ _id: id }, { $push: { downvotes: voter_id }})
    //     .then(result => {
    //         res.status(200).json(result)
    //     })
    //     .catch(next)
    // }

    static upvoteQuestion (req,res,next) {
        let { id } = req.params
        Question.findOne({ _id:id })
        .then( result => {
            let arrUpVotes = result.upvotes
            let arrDownVotes = result.downvotes
            if(arrUpVotes.indexOf(req.loggedUser._id) === -1) {
                arrUpVotes.push(req.loggedUser._id)
                if(arrDownVotes.indexOf(req.loggedUser._id) !== -1) {
                    arrDownVotes.splice(arrDownVotes.indexOf(req.loggedUser._id), 1)
                }
            } else {
                arrUpVotes.splice(arrUpVotes.indexOf(req.loggedUser._id), 1)
            }
            return Question.updateOne({ _id: id },{ upvotes: arrUpVotes, downvotes: arrDownVotes })
        })
        .then(_=>{
            res.status(201).json({ message: 'upvote success' })
        })
        .catch(next)
    }
    static downvoteQuestion (req,res,next) {
        let { id } = req.params
        Question.findOne({ _id:id })
        .then(result => {
            let arrUpVotes = result.upvotes
            let arrDownVotes = result.downvotes
            if(arrDownVotes.indexOf(req.loggedUser._id) === -1) {
                arrDownVotes.push(req.loggedUser._id)
                if(arrUpVotes.indexOf(req.loggedUser._id) !== -1) {
                    arrUpVotes.splice(arrUpVotes.indexOf(req.loggedUser._id), 1)
                }
            } else {
                arrDownVotes.splice(arrDownVotes.indexOf(req.loggedUser._id), 1)
            }
            return Question.updateOne({ _id:id },{ upvotes: arrUpVotes, downvotes: arrDownVotes })
        })
        .then(_=>{
            res.status(201).json({ message: 'downvote success' })
        })
        .catch(next)
    }

}

module.exports = QuestionController