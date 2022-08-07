const express = require("express");
const asyncHandler = require("express-async-handler");
const { protect } = require("../Middleware/AuthMiddleware.js");
const User = require("../Models/UserModel.js");
const UserModel = require("../Models/UserModel.js");
const { generateToken } = require("../utils/generateToken.js");

const userRoutes = express.Router();

//LOGIN
userRoutes.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        lastName : user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

//REGISTER
userRoutes.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, lastName, email, password } = req.body;
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      lastName,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        lastName : user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

//PROFILE
userRoutes.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        lastName : user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
    
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
    // res.send("user profile");
  })
);

//UPDATE PROFILE
userRoutes.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        lastName : user.lastName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
    
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  
  })
);

module.exports = userRoutes;
