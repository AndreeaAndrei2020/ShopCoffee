const express = require("express");
const asyncHandler = require("express-async-handler");
const { protect } = require("../Middleware/AuthMiddleware.js");
const UserModel = require("../Models/UserModel.js");
const { generateToken } = require("../utils/generateToken.js");

const userRoutes = express.Router();

//LOGIN
userRoutes.post(
  "/login",
  asyncHandler(async (request, response) => {
    const { email, password } = request.body;
    const userInformation = await UserModel.findOne({ email });

    if (userInformation && (await userInformation.matchPassword(password))) {
      response.json({
        _id: userInformation._id,
        name: userInformation.name,
        lastName: userInformation.lastName,
        email: userInformation.email,
        token: generateToken(userInformation._id),
        createdAt: userInformation.createdAt,
      });
    } 
    else
     {
      response.status(401);
      throw new Error("Email-ul sau parola este invalida");
    }
  })
);

//REGISTER
userRoutes.post(
  "/",
  asyncHandler(async (request, response) => {
    const { name, lastName, email, password } = request.body;
    const userData = await UserModel.findOne({ email });

    if (userData) {
      response.status(400);
      throw new Error(
        "Acest utilizator deja există! Folositi alta adresa de email."
      );
    }
    const userInformation = await UserModel.create({
      name,
      lastName,
      email,
      password,
    });

    if (userInformation) {
      response.status(201).json({
        _id: userInformation._id,
        name: userInformation.name,
        lastName: userInformation.lastName,
        email: userInformation.email,
        token: generateToken(userInformation._id),
      });
    } else {
      response.status(400);
      throw new Error("Datele utilizatorului sunt  nevalide");
    }
  })
);

//  UPDATE PASSWORD PROFILE
// userRoutes.get(
//   "/profile",
//   protect,
//   asyncHandler(async (req, res) => {
//     const user = await UserModel.findById(req.user._id);

//     if (user) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         lastName: user.lastName,
//         email: user.email,
//         // isAdmin: user.isAdmin,
//         createdAt: user.createdAt,
//       });
//     } else {
//       res.status(404);
//       throw new Error("User not found");
//     }
//     // res.send("user profile");
//   })
// );

//UPDATE PROFILE
userRoutes.put(
  "/profile",
  protect,
  asyncHandler(async (request, response) => {
    const userInfo = await UserModel.findById(request.user._id);

    if (userInfo) {
      userInfo.name = request.body.name || userInfo.name;
      userInfo.email = request.body.email || userInfo.email;

      if (request.body.password) {
        userInfo.password = request.body.password;
      }
      const updatedUserInfo = await userInfo.save();
      response.json({
        _id: updatedUserInfo._id,
        name: updatedUserInfo.name,
        lastName: user.lastName,
        email: updatedUserInfo.email,
        createdAt: updatedUserInfo.createdAt,
        token: generateToken(updatedUserInfo._id),
      });
    } else {
      response.status(404);
      throw new Error("Utilizatorul nu este gasit");
    }
  })
);

module.exports = userRoutes;
