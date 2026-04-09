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

const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      message: "All categories fetched successfully",
      fetchedCategory: categories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { catname, catdesc } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { catname, catdesc },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addCategory, getCategory, updateCategory, deleteCategory };