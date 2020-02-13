const express = require("express");
const User = require("../../models/user"); // import schema

const router = express.Router();

//getting list of users
router.get("/", async (req, res) => {
  //console.log(req.user)
  res.send(await User.find());
}); // //IN POSTMAN http://localhost:3300/user

//we are just using mongoose and mongo using passport-local-mongoose
router.post("/register", async (req, res) => {
  try {
    const newUser = await User.register(req.body, req.body.password);
    res.send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
}); //IN POSTMAN http://localhost:3300/user/register

module.exports = router;
