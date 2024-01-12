const passport = require('passport')
const User = require('../models/userModel')
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const loginPage = (req, res) => {
    if(req.isAuthenticated()) {
      res.redirect('/home')
    } else {
      res.render('login', { user: req.user })
    }
}

const loginUser = passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: false
})

const registerPage = (req, res) => {
    res.render('register', { user: req.user })
}

const registerUser = async (req, res) => {
    try {
        console.log(req.body)
      const { username, password } = req.body;
      const user = new User({ username });
      await User.register(user, password);
      passport.authenticate('local')(req, res, function () {
        res.redirect('/home');
      });
    } catch (err) {
      console.log(err);
      res.redirect('/register');
    }
  };

const logoutUser = (req, res) => {
    req.logout(function(err) {
        if(err) {return next(err)}
        console.log('User Logged Out')
        res.redirect('/')
    })
}

module.exports = {
    loginUser,
    registerPage,
    registerUser,
    logoutUser,
    loginPage
}