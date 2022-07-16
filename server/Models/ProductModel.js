const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    image:String,
    description:String,
    price:String,

    }
)
const User = mongoose.model("Product",userSchema)

module.exports = User