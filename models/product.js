const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "PLease Prduct Name Must be Provided"],
    },
    price: {
      type: Number,
      required: [true, "PLease Prduct Price Must be Provided"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    company: {
      type: String,
      enum: {
        values: ["ikea", "liddy", "caressa", "marcos"],
        message: "{VALUE} is not supported",
      },
      // enum: ["ikea", "liddy", "caressa", "marcos"],
    },
    rating:{
      type: Number,
      default: 4.9
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productsSchema);

