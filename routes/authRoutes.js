const express = require('express');
const passport = require('passport');
const mainController = require('../controllers/mainController');
const router = express.Router();


router
  .get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router
    .get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    console.log('Login successful, redirecting to home page')
    res.redirect('/home')
  }
);

module.exports = router;
