const User = require("../models/User.model");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passport = require("passport");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    (email, password, next) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return next(null, false, { message: "Incorrect username." });
          } else if (!bcrypt.compareSync(password, user.hashedPassword)) {
            return next(null, false, { message: "Incorrect password." });
          } else {
            return next(null, user);
          }
        })
        .catch((err) => console.error(err));
    }
  )
);

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});
