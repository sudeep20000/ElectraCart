const express = require("express");
const router = express.Router();
const { addToCart, getCartData } = require("../controllers/private");

router.route("/addItem").post(addToCart);
router.route("/cartItems").get(getCartData);

module.exports = router;
