const express = require("express");
const Product = require("./Models/ProductModel.js");
const products = require('./data/DrinksCoffee.js');

const ImportData = express.Router();

ImportData.post("/drinks", async (req, res) => {
  await Product.remove({});
  const importProducts = await Product.insertMany(products);
  res.send({importProducts});
});

module.exports = ImportData;
