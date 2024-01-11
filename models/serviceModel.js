const mongoose = require('mongoose')
const cloudinary = require('../config/cloudinary')

const serviceSchema = new mongoose.Schema({
    date: Date,
    mileage: String,
    typeOfService: String,
    serviceNotes: String,
    image:String,
    cloudinaryId: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Service', serviceSchema)