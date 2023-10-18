const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    date: Date,
    workout1: String,
    workout2: String,
    readingNotes: String,
    otherNotes: String,
    image:String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Log', logSchema)