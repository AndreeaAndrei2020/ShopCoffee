const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

///connect  mongoDB

const connectDatabase = async () => {
  try {
    const connectDatabase = await mongoose.connect(MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MangoDB is running...");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDatabase;
