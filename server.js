const express = require("express"); //e1
const mongoose = require("mongoose");
const userRouter = require("./src/routes/user"); //u1
const passport = require("passport"); //p1
const auth = require("./src/utils/auth");
mongoose.connect(
  " mongodb://127.0.0.1:27017/basicAuth",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => console.log(err ? err : "Mongo Connected")
);

const server = express(); //e2
server.use(express.json());
server.use(passport.initialize()); //initilizing passport p2
server.use("/user", userRouter); //u2
server.listen(process.env.PORT || 3300, () => console.log("Server is running")); //e3
