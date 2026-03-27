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
      productDetails,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding product",
    });
  }
};

module.exports = { Addproduct };