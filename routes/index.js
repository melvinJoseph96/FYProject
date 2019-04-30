const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, function(req, res){

  
  if(req.user.isMP){
    
    users.push(req.user)
    medicalUsers.push(req.user)
    
    res.render('MPdashboard', {
  
      user: req.user
    }) 


  }else{
    users.push(req.user)
    clients.push(req.user)    


    res.render('dashboard', {
  
      user: req.user
    }) 


  }



});

//Symptoms checker
router.get('/symChecker',ensureAuthenticated, (req,res) =>
  res.render('symChecker', {
    user:req.user
  })
);

router.get('/interview', ensureAuthenticated, (req,res) =>
  
  
  res.render('interview', {
    
    user:req.user
  })

  
);

router.get('/chat', ensureAuthenticated, function(req, res){

  console.log(req.body.text)
  
  
  res.render('videochat', {
    
    user:req.user
  })

  
});

router.get('/videochatMP', ensureAuthenticated, function(req, res){
console.log("made it to index")
  
  
  res.render('videochatMP', {
    
    user:req.user
  })
});





module.exports = router;
