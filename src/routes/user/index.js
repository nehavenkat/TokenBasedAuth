const express = require("express");
const User = require("../../models/user"); // import schema
const passport = require("passport"); //import passport from utils
//willing to keep the user list only to authorise (i.e to check username and password)
const { generateToken } = require("../../utils/auth"); //connecting the token here from utils auth
//https://www.npmjs.com/package/multer-azure-storage
const multer = require("multer");
const MulterAzureStorage = require("multer-azure-storage");
const upload = multer({
  storage: new MulterAzureStorage({
    azureStorageConnectionString: process.env.AZURE_STORAGE,
    containerName: "images",
    containerSecurity: "blob"
  })
});

const router = express.Router();

// //getting list of users
// router.get("/", async (req, res) => {
//   //console.log(req.user)
//   res.send(await User.find());
// }); // //IN POSTMAN http://localhost:3300/user

router.get("/", passport.authenticate("local"), async (req, res) => {
  console.log(req.user);
  res.send(await User.find());
}); // INPOSTMAN we need to check in BODY by giving USERNAME and PASSWORD

//we are just using mongoose and mongo using passport-local-mongoose
router.post("/register", async (req, res) => {
  try {
    const newUser = await User.register(req.body, req.body.password);
    res.send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
}); //IN POSTMAN http://localhost:3300/user/register

// generating token to represent the USER we use JWT token
router.post("/login", passport.authenticate("local"), async (req, res) => {
  const token = generateToken({ _id: req.user.id });
  // if we want the username to be visible then we use "username: req.user.username"
  res.send({
    access_token: token,
    username: req.user.username
  }); //INPOSTMAN: http://localhost:3300/user/login with the required username and password
  // we get the access token and the username which we can check from "https://jwt.io/" website.
});

//to trigger the Token.strategy
router.post("/refresh", passport.authenticate("jwt"), async (req, res) => {
  res.send(req.user);
}); //http://localhost:3300/user/refresh in authorization ==> TYPE: token ==> takee the accesscode of the user and the post

//just uploading images
// router.post("/uploadImages", upload.single("images"), async (req, res) => {
//   console.log(req.file);
//   res.send("ok");
// });

//to make it as the profile picture
router.post(
  "/uploadImages",
  passport.authenticate("jwt"),
  upload.single("images"),
  async (req, res) => {
    console.log(req.file);
    res.send("ok");
  }
);
module.exports = router;
