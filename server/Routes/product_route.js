const express = require("express");
const router = express.Router();

const {Addproduct,GetProducts} = require("../Controller/product_controller");

router.post("/add", Addproduct);
router.get("/get",GetProducts)

module.exports = router;