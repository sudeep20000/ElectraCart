const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide username"],
  },
  address: {
    type: String,
    required: [true, "Please provide customer address"],
  },
  paymentMethod: {
    type: String,
    required: [true, "Please provide payment method"],
  },
  totalMRP: {
    type: Number,
    required: [true, "Please provide total amount"],
  },
  extraCharges: {
    type: Number,
    required: [true, "Please provide extra charges"],
  },
  estimatedDate: {
    type: String,
    required: [true, "Please provide estimated date"],
  },
  customerId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide author id"],
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
