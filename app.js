const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();
const errorMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

//middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res
    .status(200)
    .send("<h1>Store API</h1><a href='/api/v1/products'>Products Route</a>");
});

//Products Route

//// Not-found middleware (for handling 404 errors)
app.use(notFoundMiddleware);
// Error-handling middleware (for handling all other errors)
app.use(errorMiddleware);


const start = async()=>{
  try {
    //Connect to DB
    app.listen(
      port,
      console.log(`Server running on port http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
}
start()
