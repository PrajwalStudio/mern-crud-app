const express = require("express");
const router = express.Router();
const upload = require("../Middleware/Auth");

const {Addproduct,GetProducts} = require("../Controller/product_controller");

router.post("/add", upload.single("pimage"), Addproduct);
router.get("/get",GetProducts)

module.exports = router;