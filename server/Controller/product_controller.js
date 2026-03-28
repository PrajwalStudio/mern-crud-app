const productModel = require("../Models/product_model");

const Addproduct = async (req, res) => {
  try {
    const { pname,pprice,pqty,pdesc} = req.body;

    const productDetails = new productModel({
      productname: pname,
      productprice: pprice,   
      productqty: pqty,
      productdesc: pdesc,     
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
    const products = await productModel.find();
    console.log(products)
    res.status(200).json({
      message: "All Products",
      fetchedProduct:products
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

module.exports = { Addproduct, GetProducts };
