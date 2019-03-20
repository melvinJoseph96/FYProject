const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

//Symptoms checker
router.get('/symChecker',ensureAuthenticated, (req,res) =>
  res.render('symChecker', {
    user:req.user
  })
);

router.get('/age',ensureAuthenticated, (req,res) =>
  res.render('age', {
    user:req.user
  })
);

module.exports = router;
