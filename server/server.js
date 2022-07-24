const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); // loads environment variables from a . env file into process. env .
app.use(cors());
app.use(express.static("public"));

const ImportData = require("./DataImport");
const mangoDB = require("./config/MongoDB.js");
const productRoute = require("./Routes/ProductRoutes");
const foodRoute = require("./Routes/FoodRoute.js");
const equipmentsRoute = require('./Routes/EquipmentRoute.js');
const BaristaCoursesRoute = require('./Routes/BaristaCoursesRoute.js');
const { errorHandler ,notFound } = require("./Middleware/Errors");



///CONNECT MANGODB
mangoDB();

///API
app.use("/api/import",ImportData);
app.use("/api/drinks",productRoute);
app.use("/api/food",foodRoute);
app.use("/api/equipment",equipmentsRoute);
app.use("/api/baristaCourses",BaristaCoursesRoute);

///ERROR HANDLER
app.use(notFound);
app.use(errorHandler)


app.listen(5000, console.log("server running..."));
