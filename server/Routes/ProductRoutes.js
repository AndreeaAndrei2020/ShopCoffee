const express = require("express");
const asyncHandler = require("express-async-handler");
const ProductModel = require("../Models/ProductModel.js");


const productRoute = express.Router();

productRoute.get(
  "/",
  asyncHandler(async (req,res) => {
    const products = await ProductModel.find({});
    res.json({drinksCoffee :products ,drinksCoktails: "1"}); ///aici trimit la frontend
  })
);
module.exports = productRoute;