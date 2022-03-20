const express = require('express'); //importing express
const router = express.Router(); //importing router

const { create, productById, read, remove, update } = require('../Controllers/product'); //importing product controller 
const { requireSignin, isAdmin, isAuth } = require('../Controllers/auth'); //importing auth controller
const { userById } = require('../Controllers/user'); //importing user controller

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete("/product/:productId/:userId", requireSignin, isAuth, isAdmin, remove);
router.put("/product/:productId/:userId", requireSignin, isAuth, isAdmin, update);

router.param('userId', userById);
router.param('product', productById);

module.exports = router;