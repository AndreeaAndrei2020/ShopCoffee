const express = require("express");
const Product = require("./Models/ProductModel.js");
const products = require("./data/DrinksCoffee.js");
const cocktails = require("./data/DrinksCocktails.js")
const asyncHandler = require("express-async-handler");

const ImportData = express.Router();

ImportData.post(
  "/drinks",
  asyncHandler(async (req, res) => {
    await Product.remove({});
    const importDrinksCoffee = await Product.insertMany(products);
    const importDrinksCoktails = await Product.insertMany(cocktails);

    res.send({ importDrinksCoffee , importDrinksCoktails});  ///aici trimit la mangoDB
  })
);



module.exports = ImportData;
