const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    email:{
        type:String,
        require: true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:String,
        require:true,
        default:false
        
    }},
    {
        timestamps:true
    }
)
const User = mongoose.model("User",userSchema)

module.exports = User