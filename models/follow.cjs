const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower_id: {
        type:String,
        required: true
    },
    following_id: {
        type:String,
        required: true
    },
    dateFollow: {
        type: Date,
        required: true,
        default: new Date()
    }
})

module.exports = mongoose.model('Follow', followSchema)