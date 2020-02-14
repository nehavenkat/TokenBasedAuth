// to make authorization and authentication available for TOKEN BASED AUTHENTICATION we need to configure the PASSPORT

const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../../models/user");

//We need to specify to passport how we are going to handle serialization and deserialization of the UserModel
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// to use the local strategy
passport.use(new LocalStrategy(User.authenticate()));
