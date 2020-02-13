// https://www.npmjs.com/package/passport-local-mongoose

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  role: {
    type: String,
    required: true,
    default: "User"
  }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("TokenAuth", UserSchema);
