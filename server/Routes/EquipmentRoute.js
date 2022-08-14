const express = require("express");
const equipmentRoute = express.Router();
const asyncHandler = require("express-async-handler");

const equipmentModel = require("../Models/equipmentModel.js");

equipmentRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const equipments = await equipmentModel.find({});
    res.json(equipments); ///aici trimit la frontend
  })
);

equipmentRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const equipment = await equipmentModel.findById(req.params.id);
    if (equipment) {
      res.json(equipment);
    }
    else{
    res.status(404);
    throw new Error("equipment not found")
  }})
);


module.exports = equipmentRoute;
