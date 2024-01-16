const passport = require('passport');
const User = require('../models/userModel');
const flash = require('connect-flash')

const loginPage = (req, res) => {
  res.render('login', {user: req.user, messages: req.flash('error') || []});
};

const loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      req.flash('error', `User not found. Please check username and password and try again.`);
      return res.render('login', {
        messages: req.flash('error') || []
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      return res.redirect('/home');
    });
  })(req, res, next);
};


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
      messages: req.flash('error') || []
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