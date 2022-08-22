const express = require("express");
const asyncHandler = require("express-async-handler");

const ImportData = express.Router();


const schemaDrinks = require("./Models/ProductModel.js");
const coffeeDrinks = require("./data/DrinksCoffee.js");
const cocktailsDrinks = require("./data/DrinksCocktails.js");

const food = require("./data/Food.js");
const SchemaFood = require("./Models/foodModel.js");

const User = require('./Models/UserModel.js');
const users = require('./data/users.js');


const schemaEquipments = require('./Models/EquipmentModel.js');
const equipments = require('./data/Equipments.js');

const BaristaCoursesSchema = require('./Models/BaristaCoursesModel.js');
const baristaCourses = require('./data/BaristaCourses.js');

const giftCards = require('./data/GiftCards.js');
const ModelGiftCards = require('./Models/ModelGiftCards.js');



ImportData.post(
  "/giftCards",
  asyncHandler(async (req, res) => {
    await ModelGiftCards.remove({});
    const importGiftCards = await ModelGiftCards.insertMany(giftCards);
    res.send({ importGiftCards});  
  })
);

ImportData.post(
  "/drinks",
  asyncHandler(async (req, res) => {
    await schemaDrinks.remove({});
    const importCoffeeDrinks = await schemaDrinks.insertMany(coffeeDrinks);
    const importCoktailsDrinks = await schemaDrinks.insertMany(cocktailsDrinks);  ///to MongoDB

    res.send({ importCoffeeDrinks , importCoktailsDrinks});  ///aici trimit la client
  })
);

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.remove({});
    const importUser = await User.insertMany(users);
    res.send({ importUser}); 
  })
);


ImportData.post(
  "/drinks",
  asyncHandler(async (req, res) => {
    await schemaDrinks.remove({});
    const importCoffeeDrinks = await schemaDrinks.insertMany(coffeeDrinks);
    const importCoktailsDrinks = await schemaDrinks.insertMany(cocktailsDrinks);

    res.send({ importCoffeeDrinks , importCoktailsDrinks});  
  })
);

ImportData.post(
  "/equipment",
  asyncHandler(async (req, res) => {
    await schemaEquipments.remove({});
    const importEquipments = await schemaEquipments.insertMany(equipments);

    res.send({ importEquipments });  
  })
);



ImportData.post(
  "/food",
  asyncHandler(async (req, res) => {
    await SchemaFood.remove({});
    const importFood = await SchemaFood.insertMany(food);

    res.send({ importFood }); 
  })
);

ImportData.post(
  "/baristaCourses",
  asyncHandler(async (req, res) => {
    await BaristaCoursesSchema.remove({});
    const importBaristaCourse = await BaristaCoursesSchema.insertMany(baristaCourses);

    res.send({ importBaristaCourse });  
  })
);

module.exports = ImportData;
