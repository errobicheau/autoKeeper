// passport.js
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const User = require('../models/userModel');


module.exports = function (passport) {
  // Serialize the user ID
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize the user by finding them in the database using the ID
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  });

  //Local Strategy
  passport.use(new LocalStrategy(User.authenticate()));

};
