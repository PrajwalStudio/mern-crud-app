const express = require("express");
const router = express.Router();

const { addCategory } = require("../Controller/category_controller");

// Route to add category
router.post("/add", addCategory);

module.exports = router;