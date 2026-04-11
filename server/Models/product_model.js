const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productname: { type: String },
  productprice: { type: String },
  productqty: { type: String },
  productdesc: { type: String },
  productimage: { type: String },
  categoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);