const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
const productModel = require("../Models/ProductModel.js");

///aici ma conectez la mongoDB

// const prod = [
//   {name: "Lattee",image:'/images/drinks/coffee/Lattee.jpg' ,description:"",price : 18},
//   {name: "Espresso" ,image:'/images/drinks/coffee/espresso.jpg' ,description:"", price: 12},
//   {name: "Macchiato" ,image:'/images/drinks/coffee/macchiato.jpg' ,description:"",price: 15},
//   {name: "IceCoffee" ,image:'/images/drinks/coffee/iceCoffee.jpg',description:"" ,price: 19}
// ];

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    const drinksCoffee = [
      {
        name: "Lattee",
        image: "/images/drinks/coffee/Lattee.jpg",
        description: "",
        price: 18,
      },
      {
        name: "Espresso",
        image: "/images/drinks/coffee/espresso.jpg",
        description: "",
        price: 12,
      },
      {
        name: "Macchiato",
        image: "/images/drinks/coffee/macchiato.jpg",
        description: "",
        price: 15,
      },
      {
        name: "IceCoffee",
        image: "/images/drinks/coffee/iceCoffee.jpg",
        description: "",
        price: 19,
      },
    ];

    await productModel.insertMany(drinksCoffee);
    console.log("MangoDB is running...");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDatabase;
