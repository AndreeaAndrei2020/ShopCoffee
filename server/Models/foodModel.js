const mongoose = require("mongoose");

const foodModel =  mongoose.Schema({
  name: { type: String, require: true },
  image: { type: String, require: true },
  grams: { type: Number, require: true },
  price: { type: Number, require: true }
},  {timestamps:true});

module.exports = mongoose.model("Food", foodModel);
