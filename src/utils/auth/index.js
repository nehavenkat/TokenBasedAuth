// to make authorization and authentication available for TOKEN BASED AUTHENTICATION we need to configure the PASSPORT

const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../../models/user");
const jwt = require("jsonwebtoken"); // generates token
const jwtStrategy = require("passport-jwt").Strategy;
//we are going to take the jwt from extract jwt
const ExtractJwt = require("passport-jwt").ExtractJwt;
//We need to specify to passport how we are going to handle serialization and deserialization of the UserModel
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// to use the local strategy
passport.use(new LocalStrategy(User.authenticate()));
const password = "nehaStrive1234";
const jwtConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: password
};

passport.use(
  new jwtStrategy(jwtConfig, (jwtPayload, next) => {
    User.findById(jwtPayload._id, (err, user) => {
      if (err) return next(err, null);
      else if (user) return next(null, user);
      else return null, false;
    });
  })
);

module.exports = {
  generateToken: userInfo => jwt.sign(userInfo, password, { expiresIn: 1000 })
};
