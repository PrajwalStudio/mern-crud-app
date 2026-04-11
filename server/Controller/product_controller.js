const productModel = require("../Models/product_model");

const Addproduct = async (req, res) => {
  try {
    const { pname, pprice, pqty, pdesc, pcategory } = req.body;
    const imageName = req.file ? req.file.filename : null;

    if (!pcategory) {
      return res.status(400).json({
        message: "Category is required",
      });
    }

    const productDetails = new productModel({
      productname: pname,
      productprice: pprice,
      productqty: pqty,
      productdesc: pdesc,
      productimage: imageName,
      categoryid: pcategory,
    });

    await productDetails.save();

    res.status(201).json({
      message: "Product added successfully",
      pdata:productDetails
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding product",
    });
  }
};
const GetProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("categoryid", "catname catdesc");

    console.log(products);
    res.status(200).json({
      message: "All Products",
      fetchedProduct: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

module.exports = { Addproduct, GetProducts };
