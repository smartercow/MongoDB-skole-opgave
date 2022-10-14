const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    // Javascript objekter

    userName: {
        type: String,
        require: true
    },
    userMail: {
        type: String,
        require: true
    },
    userAge: {
        type: Number,
        require: true
    },
    userAddDate: {
        type: Date,
        require: true,
        default: Date.now
    }

})

module.exports = mongoose.model('user', userSchema)