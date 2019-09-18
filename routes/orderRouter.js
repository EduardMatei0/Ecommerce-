const router = require('express').Router();
const {
  requireSignin,
  isAuth,
  isAdmin
} = require('../controller/authController');

const {
  userById,
  addOrderToUserHistory
} = require('../controller/userController');
const {
  create,
  listOrders,
  getStatusValues,
  orderById,
  updateOrderStatus
} = require('../controller/orderController');
const { decreaseQuantity } = require('../controller/productController');

router.post(
  '/order/create/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);

router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrders);
router.get(
  '/order/status-values/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  getStatusValues
);

router.put(
  '/order/:orderId/status/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  updateOrderStatus
);

router.param('userId', userById);
router.param('orderId', orderById);

module.exports = router;
