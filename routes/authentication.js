// modules imports
const { Router } = require('express');
// local imports
const { 
  signup,
  signin,
  } = require('../controllers/authentication');
// local definitions
const router = Router();

// Signup
router.post('/signup', signup);

// Signin
router.post('/signin', signin);

module.exports = router;