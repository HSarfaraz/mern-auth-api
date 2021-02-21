const express = require('express');
const router = express.Router();

// import read method from controller, read the user information
const { requireSignin, adminMidlleware, signin } = require('../controllers/auth');
const { read, update } = require('../controllers/user');

// import validators
// const { userSignupValidator, userSigninValidator } = require('../validators/auth');
// const { runValidation } = require('../validators');

//Based on user id, we are going to find the user
router.get('/user/:id', requireSignin, read);
//update the user
router.put('/user/update', requireSignin, update);
router.put('/admin/update', requireSignin, adminMidlleware, update);

module.exports = router;
