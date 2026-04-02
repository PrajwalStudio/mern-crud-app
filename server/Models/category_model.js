const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  catname:{type:String},
  catdesc:{type:String}
});

module.exports = mongoose.model("Category", categorySchema);