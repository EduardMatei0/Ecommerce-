const router = require('express').Router();
const {
  signup,
  login,
  logout,
  requireSignin
} = require('../controller/authController');
const { userSignupValidator } = require('../validator');

router.post('/signup', userSignupValidator, signup);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
