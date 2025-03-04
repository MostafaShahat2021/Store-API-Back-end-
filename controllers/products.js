const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // throw new Error("testing async-errors");
  // res.status(200).json({ msg: "products testing route" });

  // const products = await Product.find({}) // get all products
  // const products = await Product.find({ featured: true }); // get products by special criteria
  
  const products = await Product.find({ name: "vase table" }); // get products by special criteria
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "products route" });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};

