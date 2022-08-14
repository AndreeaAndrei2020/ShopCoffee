const express = require("express");
const BaristaCoursesRoute = express.Router();
const asyncHandler = require("express-async-handler");

const BaristaCoursesModel = require("../Models/BaristaCoursesModel.js");

BaristaCoursesRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const baristaCourses = await BaristaCoursesModel.find({});
    res.json(baristaCourses); ///aici trimit la frontend
  })
);

BaristaCoursesRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const baristaCourse = await BaristaCoursesModel.findById(req.params.id);
    if (baristaCourse) {
      res.json(baristaCourse);
    }
    else{
    res.status(404);
    throw new Error("equipment not found")
  }})
);


module.exports = BaristaCoursesRoute;
