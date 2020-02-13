const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./src/routes/user");

mongoose.connect(
  " mongodb://127.0.0.1:27017/basicAuth",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => console.log(err ? err : "Mongo Connected")
);

const server = express();
server.use(express.json());
server.use("/user", userRouter);
server.listen(process.env.PORT || 3300, () => console.log("Server is running"));
