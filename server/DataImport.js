const express = require("express");
const Product = require("./Models/ProductModel.js");
const products = require("./data/DrinksCoffee.js");
// const cocktails = require('./data/DrinksCocktails.js')
const asyncHandler = require("express-async-handler");

const ImportData = express.Router();

ImportData.post(
  "/drinks",
  asyncHandler(async (req, res) => {
    await Product.remove({});
    const importProducts = await Product.insertMany(products);
    // const importCoktails = await Product.insertMany()
    console.log(111)
    res.send({ importProducts });
  })
);



module.exports = ImportData;
