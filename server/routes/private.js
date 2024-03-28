const express = require("express");
const router = express.Router();
const {
  addToCart,
  getFilteredCartData,
  getCartData,
  editQuantity,
  addInvoice,
} = require("../controllers/private");

router.route("/cartItems").get(getCartData);
router.route("/filteredCartItems").get(getFilteredCartData);
router.route("/addItem").post(addToCart);
router.route("/editProductQuantity").post(editQuantity);
router.route("/addInvoiceData").post(addInvoice);

module.exports = router;
