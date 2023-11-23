// passport.js
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If the user doesn't exist, create a new user in the database
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            // Add other relevant user profile information here
          });
          await user.save();
        }

        // Return the user object
        return done(null, user);
      } catch (error) {
        console.error(error);
        return done(error, null);
      }
    }
  ));

  //Local Strategy
  passport.use(new LocalStrategy(User.authenticate()));

};
