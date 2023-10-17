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
    id_parent_post: {
        type:String,
        required: false,
        default: null
    },
    datePosted: {
        type: Date,
        required: true,
        default: new Date()
    }
})

module.exports = mongoose.model('Post', postSchema)