const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); // loads environment variables from a . env file into process. env .
app.use(cors());
app.use(express.static("public"));
const mangoDB = require("./config/MongoDB.js");
const ImportData = require("./DataImport");
const productRoute = require("./Routes/ProductRoutes");
const foodRoute = require("./Routes/FoodRoute.js");
const equipmentsRoute = require("./Routes/EquipmentRoute.js");
const BaristaCoursesRoute = require("./Routes/BaristaCoursesRoute.js");
const GiftCards = require("./Routes/GiftCardsRoute.js");
const userRouter = require("./Routes/userRoutes.js");
const orderRouter = require("./Routes/orderRoutes");
const { errorHandler, notFound } = require("./Middleware/Errors");

///CONNECT MANGODB
mangoDB();
app.use(express.json());
///API
app.use("/api/import", ImportData);
app.use("/api/drinks", productRoute);
app.use("/api/giftCards", GiftCards);
app.use("/api/food", foodRoute);
app.use("/api/equipment", equipmentsRoute);
app.use("/api/baristaCourses", BaristaCoursesRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

///ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

app.listen(5000, console.log("server running..."));
