const mongoose = require("mongoose");

const baristaCoursesModel =  mongoose.Schema({
  name: { type: String, require: true },
  image: {type: String, require: true },
  price: { type: Number, require: true }
},  {timestamps:true});


module.exports =
    mongoose.models.BaristaCourse || mongoose.model('BaristaCourse', baristaCoursesModel);