const mongoose = require("mongoose");

const productModel = mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    countInStock: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productModel);
