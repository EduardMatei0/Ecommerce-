const router = require('express').Router();
const {
  userById,
  read,
  update,
  purchaseHistory
} = require('../controller/userController');
const {
  requireSignin,
  isAuth,
  isAdmin
} = require('../controller/authController');

router.param('userId', userById);

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  });
});

router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);

module.exports = router;
