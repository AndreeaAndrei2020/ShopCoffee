const mongoose = require("mongoose");

const productModel = mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    countInStock: { type: Number, require: true },
    typeOfProduct :{ type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("drinks", productModel);
