const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true
    },

    grievance: {
        type: String,
        require: true
    }
},
    {
        timestamps: true
    }

);

const grev = mongoose.model("grev", userSchema)
module.exports = grev