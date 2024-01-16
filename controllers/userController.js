const passport = require('passport');
const User = require('../models/userModel');
const flash = require('connect-flash')

const loginPage = (req, res) => {
  res.render('login', {user: req.user });
};

const loginUser = passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
});

const registerPage = (req, res) => {
  res.render('register', {
    user: req.user,
    messages: req.flash('error') || []
  });
};


const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username });
    await User.register(user, password);
    passport.authenticate('local')(req, res, function () {
      res.redirect('/home');
    });
  } catch (err) {
    console.error(err.message);
    req.flash('error', (`${err.message}. Please try again.`));

    
    res.render('register', { 
      user: req.user,
      messages: req.flash('error') || [] // Ensure 'messages' is always defined
    })
  };
}


const logoutUser = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
};

module.exports = {
  loginPage,
  loginUser,
  registerPage,
  registerUser,
  logoutUser
};