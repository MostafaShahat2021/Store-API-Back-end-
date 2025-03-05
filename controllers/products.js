const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // throw new Error("testing async-errors");
  // res.status(200).json({ msg: "products testing route" });

  // const products = await Product.find({}) // get all products
  // const products = await Product.find({ featured: true }); // get products by special criteria
  // const products = await Product.find({ name: "vase table" }); // get products by special criteria

  const products = await Product.find({}).sort("-name price"); // sort products from z to a and price from small to larg
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  // console.log(req.query); // ~/products?featured=true
  // Sort ~/products?sort=name

  const { featured, company, name } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  console.log(queryObject);
  const products = await Product.find(queryObject);

  res.status(200).json({ success: true, count: products.length, products });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
