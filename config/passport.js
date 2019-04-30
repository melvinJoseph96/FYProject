const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');
// Load medical professional model
const medical_professional =  require('../models/mUser');

const strategy1 = new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  // Match user
  User.findOne({
    email: email
  }).then(user => {
    if (!user) {
      return done(null, false, { message: 'That email is not registered' });
    }

    // Match password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    });
  });
})

const strategy2 = new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  // Match user
  medical_professional.findOne({
    email: email
  }).then(user => {
    if (!user) {
      return done(null, false, { message: 'That email is not registered' });
    }

    if(password.equals(user.password)){
      return done(null,user)
    }else{
      return done(null, false, { message: 'Password incorrect' });
    }

    // Match password
    // bcrypt.compare(password, user.password, (err, isMatch) => {
    //   if (err) throw err;
    //   if (isMatch) {
    //     return done(null, user);
    //   } else {
    //     return done(null, false, { message: 'Password incorrect' });
    //   }
    // });
  });
})


module.exports = function(passport) {
  passport.use('local.one',strategy1 );
  passport.use('local.two',strategy2);

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
