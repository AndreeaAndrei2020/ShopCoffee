const express = require("express");
const GiftCardsRoute = express.Router();
const asyncHandler = require("express-async-handler");

const ModelGiftCards = require("../Models/ModelGiftCards");

GiftCardsRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const giftCardsRoute = await ModelGiftCards.find({});
    res.json({giftCardsRoute}); ///aici trimit la frontend
  })
);
GiftCardsRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const giftCardRoute = await ModelGiftCards.findById(req.params.id);
    console.log("pro,",giftCardRoute)
    if (giftCardRoute) {
      res.json(giftCardRoute);
    }
    else{
    res.status(404);
    throw new Error("product not found")
  }})
);




module.exports = GiftCardsRoute;
