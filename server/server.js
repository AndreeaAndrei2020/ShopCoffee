const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); // loads environment variables from a . env file into process. env .

const ImportData = require('./DataImport');
// const products = require("./data/Products.js");
// const drinksCoffee = require("./data/DrinksCoffee.js");
// const DrinksCocktails = require("./data/DrinksCocktails.js");
const mangoDB = require('./config/MongoDB.js');
const productRoute = require("./Routes/ProductRoutes");


app.use(cors())
app.use(express.static('public'))

mangoDB();

app.use("/api/import",ImportData);
app.use("/api/drinks",productRoute);


app.get("/", (req, res) => {
  res.send("API is Running");
});

app.listen(5000, console.log("server running..."));

// app.get("/api/drinks", (req, res) => {
//   res.json({
//     drinksCoffee: drinksCoffee,
//     DrinksCocktails: DrinksCocktails,
//   });
// });

// app.get("/api/products/:id", (req, res) => {
//   const product = products.find((x) => x.id == req.params.id);
//   res.json(product);
// });