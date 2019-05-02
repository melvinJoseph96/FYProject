const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');


// Login Page
router.get('/login', (req, res) => res.render('login'));

//Login page for medical professionals
router.get('/loginMP', (req, res) => res.render('MPLogin'));


// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const {
    name,
    email,
    password,
    password2
  } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({
      msg: 'Please enter all fields'
    });
  }

  if (password != password2) {
    errors.push({
      msg: 'Passwords do not match'
    });
  }

  if (password.length < 6) {
    errors.push({
      msg: 'Password must be at least 6 characters'
    });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({
      email: email
    }).then(user => {
      if (user) {
        errors.push({
          msg: 'Email already exists'
        });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});


// Login
router.post('/login', (req, res, next) => {



  passport.authenticate('local.one', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);


});

router.post('/videochatRev', (req, res, next) => {


  User.findOne({email: req.body.text}, function (err, foundObject) {
    console.log("email check: "+req.body)

    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        console.log("found no Object")
        res.status(404).send();
      } else {
        console.log("found: "+foundObject.isAvailable)
        if(foundObject.isAvailable){
          console.log("found Object: "+foundObject)
          foundObject.isAvailable = false;

          foundObject.save(function (err, updatedObject) {

            if (err) {
              console.log("eror");    
              res.status(500).send()   
    
            } else {  
              
              console.log(updatedObject)
              res.send(updatedObject)
              

              
            }
    
          })        
        }else{
          console.log("i'm at else yall")

        }

      }

    }

  });
  console.log("i'm here")
  

});


router.post('/videochat', (req, res, next) => {


  User.findOne({email: req.body.text}, function (err, foundObject) {

    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        console.log("found no Object")
        res.status(404).send();
      } else {
        console.log("found: "+foundObject.isAvailable)
        if(!foundObject.isAvailable){
          console.log("found Object: "+foundObject)
          foundObject.isAvailable = true;

          foundObject.save(function (err, updatedObject) {

            if (err) {
              console.log("eror");    
              res.status(500).send()   
    
            } else {  
              
              console.log(updatedObject)
              res.send(updatedObject)
              

              
            }
    
          })        
        }else{
          console.log("i'm at else yall")

        }

      }

    }

  });
  console.log("i'm here")
  

});



router.post('/getSocketID', (req, res, next) => {

  var email = req.body.text
  //console.log(email)
  var to_Ret =0

  for(var i =0; i>=users.length; i++){

    if(users[i].email = email){
      console.log(users[i].email)

      to_Ret=i;

    }

  }
  
  var to_Ret2 = connections[to_Ret]
  res.send({socket_id:to_Ret2})



  


});









// Logout
router.get('/logout', (req, res) => {

  console.log(req.body)


  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');

});

module.exports = router;