const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user_id: {
        type:String,
        required: true
    },
    post: {
        type:String,
        required: true
    },
    dataPublicacao: {
        type: Date,
        required: true,
        default: new Date()
    }
})

module.exports = mongoose.model('Post', postSchema)