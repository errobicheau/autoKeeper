require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
require('./config/passport')
const connectDB = require('./config/connectDB')
const mainRoutes = require('./routes/mainRoutes')
const userRoutes = require('./routes/userRoutes')
const User = require('./models/userModel')
const flash = require('connect-flash')

const PORT = process.env.port || 3500

//Require passport
require('./config/passport')(passport)

connectDB()

//--- MIDDLEWARE ---//

//express-session
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use(session({
    secret: 'this is 75Strong',
    resave: false,
    saveUninitialized: false
}))

//passport
app.use(passport.initialize())
app.use(passport.session())

//connect-flash
app.use(flash())

//-- VIEW ENGINE --//
app.set('view engine', 'ejs')

// passing current user info to all routes
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    next()
})

//-- ROUTING --//
app.use('/', mainRoutes)
app.use('/', userRoutes)


//-- DATABASE AND SERVER CONNEC --//
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))