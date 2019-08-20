const jwt = require('jsonwebtoken'); // to generate sign in token
const expressJwt = require('express-jwt'); // for authorization check
const User = require('../models/userModel');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
  const savedUser = new User(req.body);
  savedUser.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err)
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user
    });
  });
};

exports.login = (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: 'User with that email does not exist. Please signup'
      });
    }
    // if user found make sure the email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and password dont match'
      });
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 });

    // return response with user and token to frontend client
    const { _id, name, userEmail, role } = user;
    return res.json({ token, user: { _id, name, userEmail, role } });
  });
};

// logout
exports.logout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Logout succesfull' });
};

// protect sing in routes
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth'
});

exports.isAuth = (req, res, next) => {
  const user = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!user) {
    return res.status(403).json({
      error: 'Access denied'
    });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'Admin resource! Access denied'
    });
  }

  next();
};
