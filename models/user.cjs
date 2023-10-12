const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required:true
    },
    dateRegister: {
        type: Date,
        required: true,
        default: new Date()
    }
})

module.exports = mongoose.model('User', userSchema)