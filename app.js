const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();

//middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.status(200).send("<h1>Home page</h1>");
});
app.listen(
  port,
  console.log(`Server running on port http://localhost:${port}`)
);
