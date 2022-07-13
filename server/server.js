const express = require('express');
const cors = require('cors');
const products = require('./data/Products.js')

const app =  express();

app.use(cors())
app.use(express.static('public'))

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((x) =>
    x.id == req.params.id);
  res.json(product);
});

app.get("/", (req, res) => {
  res.send("API is Running");
});


app.listen(5000, console.log("server running..."));
