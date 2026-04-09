const express = require("express");
const router = express.Router();

const {
	addCategory,
	getCategory,
	updateCategory,
	deleteCategory,
} = require("../Controller/category_controller");

// Route to add category
router.post("/add", addCategory);
router.get("/get", getCategory);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;