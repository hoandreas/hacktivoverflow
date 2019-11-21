const { Schema, model } = require('mongoose')

const answerSchema = new Schema (
    {
        desc: {
            type: String,
            required: [true, 'Description is required']
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'user id is required']
        },
        question_id: {
            type: Schema.Types.ObjectId,
            ref: 'Question',
            required: [true, 'question id is required']
        },
        upvotes: {
            type: Array,
            default: []
        },
        downvotes: {
            type: Array,
            default: []
        }
    }
)

const Answer = model('Answer', answerSchema)
module.exports = Answer