const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const { create, listOrder } = require("../Controllers/order");
const { decreaseQuantity } = require("../Controllers/product");

router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);
router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrder);
router.param("userId", userById);

module.exports = router;
