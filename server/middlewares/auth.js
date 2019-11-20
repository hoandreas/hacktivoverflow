const verifyToken = require('../helpers/tokenMaker').decodeToken
const User = require('../models/user')
const Question = require('../models/question')
const Answer = require('../models/answer')

function authentication(req, res, next) {
    try {
        let decodedToken = verifyToken(req.headers.token)
        User.findById(decodedToken.id)
            .then(user => {
                if(user) {
                    req.loggedUser = decodedToken
                    next()
                } else {
                    next({ status: 401, message: 'Authentication failed' })
                }
            })
            .catch(next)
    }
    catch(err) {
        next({ status: 401, message: err })
    }
}

function questionAuthorization(req, res, next) {
    let { id } = req.params
    Question.findById(id)
        .then(question => {
            if(question && question.user_id == req.loggedUser.id) {
                next()
            } else if(!question) {
                next({ status: 404, message: "Data not found" })
            } else {
                next({ status: 401, message: "Authorization failed" })
            }
        })
        .catch(next)
}

function answerAuthorization(req, res, next) {
    let { id } = req.params
    Answer.findById(id)
        .then(answer => {
            if(answer && answer.user_id == req.loggedUser.id) {
                next()
            } else if(!answer) {
                next({ status: 404, message: "Data not found" })
            } else {
                next({ status: 401, message: "Authorization failed" })
            }
        })
        .catch(next)
}

module.exports = {
    authentication, questionAuthorization, answerAuthorization
}