const express = require("express");
const asyncHandler = require("express-async-handler");
const ProductModel = require("../Models/ProductModel");

const productRoute = express.Router();

productRoute.get(
  "/",
  asyncHandler(async (req,res) => {
    const products = await ProductModel.find({});
    res.json({drinksCoffee :products ,drinksCoktails: "1"});
  })
);
module.exports = productRoute;