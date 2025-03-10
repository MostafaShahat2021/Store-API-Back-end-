const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // throw new Error("testing async-errors");
  // res.status(200).json({ msg: "products testing route" });
  // const products = await Product.find({}) // get all products
  // const products = await Product.find({ featured: true }); // get products by special criteria
  // const products = await Product.find({ name: "vase table" }); // get products by special criteria
  // const products = await Product.find({}).sort("-name price"); // sort products from z to a and price from small to larg
  // const products = await Product.find({}).select("name price"); // serach for certain fields or select wiche fields to show in the products object
  // const products = await Product.find({}).select("name price").limit(4); // limit products to only 4 items to show on the list
  // const products = await Product.find({}).select("name price").limit(4).skip(5); // skip the first 5 items from the list
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price"); // `$gt` operator is a MongoDB query to filter documents where the value of the `price` field is greater than 30.
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  // console.log(req.query); // ~/products?featured=true
  // Sort ~/products?sort=name

  const { featured, company, name, sort, fields, numericFilters } = req.query;
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
  //aggregation: Comparison operators
  //Added numeric filtering functionality
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
      console.log(filters);
    });
  }
  console.log(queryObject);

  // sort products please notice the syntax on line 11
  let result = Product.find(queryObject);
  //sort
  if (sort) {
    // console.log(sort);
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    // Default sort field is 'createdAt'
    result = result.sort("createdAt");
  }
  // select (fields)
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  //paginaton limit&skip
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const products = await result;
  res.status(200).json({ success: true, count: products.length, products });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
