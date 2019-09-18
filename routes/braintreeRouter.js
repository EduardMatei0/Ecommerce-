const router = require('express').Router();
const { requireSignin, isAuth } = require('../controller/authController');

const { userById } = require('../controller/userController');
const {
  generateToken,
  processPayment
} = require('../controller/braintreeControler');

router.get('/braintree/getToken/:userId', requireSignin, isAuth, generateToken);
router.post(
  '/braintree/payment/:userId',
  requireSignin,
  isAuth,
  processPayment
);

router.param('userId', userById);

module.exports = router;
