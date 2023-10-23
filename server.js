require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const connectDB = require('./config/connectDB')
const mainRoutes = require('./routes/mainRoutes')
const userRoutes = require('./routes/userRoutes')
const User = require('./models/userModel')
const fileUpload = require('express-fileupload')

const PORT = process.env.port || 3500

connectDB()

//MIDDLEWARE//
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

//VIEW ENGINE//
app.set('view engine', 'ejs')

//express-session
app.use(session({
    secret: 'this is 75Strong',
    resave: false,
    saveUninitialized: false
}))

//passport
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
    //scrambling and unscrambling password
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// passing current user info to all routes
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    next()
})
app.use(fileUpload({useTempFiles: true}))

//ROUTES//
app.use('/', mainRoutes)
app.use('/', userRoutes)

//DATABASE AND SERVER CONNECT//
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})