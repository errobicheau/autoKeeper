const passport = require('passport')
const User = require('../models/userModel')

const loginPage = (req, res) => {
    res.render('login', { user: req.user })
}

const registerPage = (req, res) => {
    res.render('register', { user: req.user })
}

const loginUser = passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: false
})

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
        res.redirect('/home')
    })
}

module.exports = {
    loginPage,
    loginUser,
    registerPage,
    registerUser,
    logoutUser

}