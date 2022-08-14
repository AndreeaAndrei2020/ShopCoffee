const mongoose = require("mongoose");

const equipmentModel = mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    grams: { type: Number, require: true },
    price: { type: Number, require: true },
    size: { type: String, require: true },
    weight: { type: Number, require: true },
    power: { type: String, require: true },
    typeOfProduct: { type: String, require: true },   countInStock: { type: Number, require: true },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Equipment", equipmentModel);

module.exports =
  mongoose.models.Equipment || mongoose.model("Equipment", equipmentModel);
