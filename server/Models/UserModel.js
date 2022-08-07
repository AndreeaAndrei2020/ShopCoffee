const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

///LOGIN 
userModel.methods.matchPassword =  async function(enterPassword){
  return await bcrypt.compare(enterPassword, this.password)
}

//REGISTER
userModel.pre("save",async function(next) {
  if(!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt);
});

const User = mongoose.model("User", userModel);

module.exports = User;
