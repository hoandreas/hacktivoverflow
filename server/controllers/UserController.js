const User = require('../models/user')
const comparePassword = require('../helpers/passwordEncryptor').comparePassword
const generateToken = require('../helpers/tokenMaker').generateToken

class UserController {
    static register (req, res, next) {
        let objUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        User.create(objUser)
            .then(result => {
                let payload = {
                    id: result._id,
                    username: result.username,
                    email: result.email
                }
                let token = generateToken(payload)
                res.status(201).json({ token })
            })
            .catch(next)
    }

    static login (req, res, next) {
        User.findOne(
            {
                email: req.body.email
            }
        )
            .then(user => {
                if (user && comparePassword(req.body.password, user.password)) {
                    let payload = {
                        id: user._id,
                        email: user.email
                    }
                    let token = generateToken(payload)
                    res.status(200).json({ token })
                } else {
                    next({ status: 400, message: "wrong email or password" })
                }
            })
            .catch(next)
    }
}

module.exports = UserController