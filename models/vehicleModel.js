const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    name: String,
    year: String,
    make: String,
    model: String,
    otherInfo: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Vehicle', vehicleSchema)