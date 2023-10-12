require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/connectDB')
const PORT = process.env.port || 7500
const mainRoutes = require('./routes/mainRoutes')
connectDB()

//MIDDLEWARE//
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

//VIEW ENGINE//
app.set('view engine', 'ejs')

//ROUTES//
app.use('/', mainRoutes)

//DATABASE AND SERVER CONNECT//
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})