const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        // required: true
    },

    rollno: {
        type: Number,
        // required: true
    },
    division: {
        type: Number,
        // required: true
    }
})

module.exports = mongoose.model('User', userSchema)