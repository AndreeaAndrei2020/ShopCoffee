const express = require("express");
const foodRoute = express.Router();
const asyncHandler = require("express-async-handler");

const foodSchema = require("../Models/foodModel.js");

foodRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const food = await foodSchema.find({});
    res.json(food); ///aici trimit la frontend
  })
);

foodRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const food = await foodSchema.findById(req.params.id);
    if (food) {
      res.json(food);
    }
    else{
    res.status(404);
    throw new Error("food not found")
  }})
);


module.exports = foodRoute;
