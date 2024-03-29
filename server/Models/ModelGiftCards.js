const mongoose = require("mongoose");

const giftCardsModel = mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    typeOfProduct: { type: String, require: true },   countInStock: { type: Number, require: true },
    description: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.giftCardsModel ||
  mongoose.model("giftCards", giftCardsModel);
