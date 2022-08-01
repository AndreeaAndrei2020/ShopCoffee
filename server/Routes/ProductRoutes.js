const express = require("express");
const productRoute = express.Router();
const asyncHandler = require("express-async-handler");


const ProductModel = require("../Models/ProductModel.js");


productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const drinks = await ProductModel.find({});
    res.json(drinks); ///aici trimit la frontend
  })
);

productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.json(product);
    }
    else{
    res.status(404);
    throw new Error("product not found")
  }})
);



module.exports = productRoute;
