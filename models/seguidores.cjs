const mongoose = require('mongoose')

const seguidoresSchema = new mongoose.Schema({
    seguidor_id: {
        type:String,
        required: true
    },
    seguindo_id: {
        type:String,
        required: true
    }
})

module.exports = mongoose.model('Seguidores', seguidoresSchema)