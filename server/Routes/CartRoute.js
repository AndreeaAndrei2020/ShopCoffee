const express = require("express");
const CartRoute = express.Router();
const asyncHandler = require("express-async-handler");



CartRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    
    res.json({"1":3}); ///aici trimit la frontend
  })
);



module.exports = CartRoute;
