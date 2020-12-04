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
          console.log(`username is ${user}`);
          console.log(`email is ${email}`);
          console.log(`password is ${password}`);
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
  console.log(`passport serializer runs`);
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  console.log(`passport deserializer runs`);
  User.findById(userIdFromSession, (err, user) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, user);
  });
});
