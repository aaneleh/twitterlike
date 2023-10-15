const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    user_id: {
        type:String,
        required: true
    },
    poster_id: {
        type:String,
        required: true
    },
    post_id: {
        type:String,
        required: true
    },
    dateLiked: {
        type: Date,
        required: true,
        default: new Date()
    }
})

module.exports = mongoose.model('Like', likeSchema)