const bcrypt = require("bcrypt");

const users = [
  {
    name: "Admin",
    lastName: "ds",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    // isAdmin: true,
  },
  {
    name: "User",
    lastName: "D",
    email: "user@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;

//   src: "/images/cocktails/111.jpg",
