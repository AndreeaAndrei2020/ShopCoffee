const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
const productModel = require("../Models/ProductModel.js");

///aici ma conectez la mongoDB

const connectDatabase = async () => {
  try {
    const connectDatabase = await mongoose.connect(MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    // const drinksCoffee = [
    //   {
    //     name: "Lattee",
    //     image: "/images/drinks/coffee/Lattee.jpg",
    //     description: "",
    //     price: 18,
    //   },
    //   {
    //     name: "Espresso",
    //     image: "/images/drinks/coffee/espresso.jpg",
    //     description: "",
    //     price: 12,
    //   }
    // ];

    // await productModel.insertMany(drinksCoffee);
    console.log("MangoDB is running...");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDatabase;
