const { Schema, model } = require('mongoose')

const questionSchema = new Schema (
    {
        title: {
            type: String,
            required: [true, 'Title is required']
        },
        desc: {
            type: String,
            required: [true, 'Description is required']
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        answers: [{
            type: Schema.Types.ObjectId,
            ref: 'Answer'
        }],
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

const Question = model('Question', questionSchema)
module.exports = Question