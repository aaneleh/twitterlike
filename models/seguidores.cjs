const mongoose = require('mongoose')

const seguidoresSchema = new mongoose.Schema({
    seguidor_id: {
        type:String,
        required: true
    },
    seguindo_id: {
        type:String,
        required: true
    },
    dataRealizada: {
        type: Date,
        required: true,
        default: new Date()
    }
})

module.exports = mongoose.model('Seguidores', seguidoresSchema)