const express = require('express'); //importing express
const router = express.Router(); //importing router

const { create, productById, read } = require('../Controllers/product'); //importing product controller 
const { requireSignin, isAdmin, isAuth } = require('../Controllers/auth'); //importing auth controller
const { userById } = require('../Controllers/user'); //importing user controller

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

router.param('userId', userById);
router.param('product', productById);

module.exports = router;