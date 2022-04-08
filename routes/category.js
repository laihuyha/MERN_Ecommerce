const express = require('express'); //importing express
const router = express.Router(); //importing router

const { requireSignin, isAdmin, isAuth } = require('../Controllers/auth'); //importing auth controller
const { create } = require('../Controllers/category'); //importing category controller 
const { userById } = require('../Controllers/user'); //importing user controller

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.param('userId', userById);

module.exports = router;