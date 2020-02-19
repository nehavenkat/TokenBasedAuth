const express = require("express"); //e1
const mongoose = require("mongoose");
const userRouter = require("./src/routes/user"); //u1
const passport = require("passport"); //p1
const dotenv = require("dotenv");
const auth = require("./src/utils/auth");

dotenv.config();
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => console.log(err ? err : "Mongo Connected")
);

const server = express(); //e2
server.use(express.json());
server.use(passport.initialize()); //initilizing passport p2
server.get("/", (req, res) => {
  res.send("connected to the Azure");
});
server.use("/user", userRouter); //u2
server.listen(process.env.PORT || 3300, () => console.log("Server is running")); //e3
