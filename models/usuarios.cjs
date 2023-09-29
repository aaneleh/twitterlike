const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    senha: {
        type:String,
        required:true
    },
    following: {
        type: [String]
    }
})

module.exports = mongoose.model('Usuario', usuarioSchema)