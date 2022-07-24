const bcrypt = require('bcrypt');


const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456",10),
    isAdmin: true,
  },
  {
    name: "User",
    email: "user@example.com",
    password: bcrypt.hashSync("123456",10)
  },
];

module.exports = users;

//   src: "/images/cocktails/111.jpg",
