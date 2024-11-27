const mongoose = require('mongoose')

const heroSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})

const herolo = mongoose.model("herolo",heroSchema)
module.exports = herolo