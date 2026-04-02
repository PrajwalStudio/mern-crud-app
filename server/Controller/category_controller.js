const Category = require("../Models/category_model");

const addCategory = async (req, res) => {
  try {
    const { catname, catdesc } = req.body;

    const newCategory = new Category({
      catname,
      catdesc
    });

    await newCategory.save();

    res.status(201).json({
      message: "Category Added successfully",
      catdetails: newCategory
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addCategory };