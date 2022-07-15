// const express = require("express");
// const cors = require("cors");

// const app = express();

// const products = require("./data/Products.js");


// require("dotenv").config();

// const dotenv = require("dotenv");
// // const connectDatabase = require("./config/MongoDB.js");
// // connectDatabase()

// const REACT_APP_MONGO_URL = process.env.REACT_APP_MONGO_URL;

// const mongoose = require("mongoose");




// async function connect() {
//   try {
//     await mongoose.connect(REACT_APP_MONGO_URL);
//     console.log("connect");
//   } catch (error) {
//     console.log(error);
//   }
// }
// connect();


// console.log(process.env.REACT_APP_MONGO_URL)

// connectDatabase();
// app.use(cors());
// app.use(express.static("public"));

const express = require('express');
const cors = require('cors');
// const mongoose = require("mongoose");  

const products = require('./data/Products.js')
const drinksCoffee = require("./data/DrinksCoffee.js");
const DrinksCocktails = require("./data/DrinksCocktails.js");
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const app =  express();

app.use(cors())
app.use(express.static('public'))



app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/menu/drinks", (req, res) => {
  res.json({
    drinksCoffee: drinksCoffee,
    DrinksCocktails: DrinksCocktails
  });
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((x) => x.id == req.params.id);
  res.json(product);
});

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.listen(5000, console.log("server running..."));

