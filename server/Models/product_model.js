const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productname: { type: String },
  productprice: { type: String },
  productqty: { type: String },
  productdesc: { type: String },
});

module.exports = mongoose.model("Product", productSchema);