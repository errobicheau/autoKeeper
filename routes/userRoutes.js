// Direct traffic when it is called from server.js to appropriate controller

const express = require('express')
const userController = require('../controllers/userController')
const passport = require('passport')
const router = express.Router()

router
    .route('/login')
    .get(userController.loginPage)
    .post(userController.loginUser)

router
    .route('/googleLogin')
    .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router
    .route('/register')
    .get(userController.registerPage)
    .post(userController.registerUser)

router
    .route('/logout')
    .get(userController.logoutUser)

module.exports = router