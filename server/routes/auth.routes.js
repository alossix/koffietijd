const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

router.post("/signup", (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Provide email and password." });
  }

  if (password.length < 7) {
    return res
      .status(400)
      .json({ message: "Passwords require a minimum of 8 characters." });
  }
  const salt = bcrypt.genSaltSync(10);
  bcrypt.hash(password, salt).then((hashedPassword) => {
    User.findOne({ email }, (err, foundUser) => {
      if (err) {
        return res.status(500).json({ message: "Please check your email." });
      }
      if (foundUser) {
        return res
          .status(400)
          .json({ message: "Email in use. Please choose a different one." });
      }

      const newUser = new User({
        email,
        firstName,
        lastName,
        hashedPassword,
      });

      newUser.save((err) => {
        if (err) {
          res.status(400).json({
            message:
              "There was a problem with saving the user to the database.",
          });
          return;
        }
      });

      req.login(newUser, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "There was a problem logging in." });
        }

        res.status(200).json(newUser);
      });
    });
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "There was a problem authenticating the user." });
    }

    if (!user) {
      return res.status(401).json(info);
    }

    req.login(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "There was a problem saving the session." });
      }
    });

    res.status(200).json(user);
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "Successfully logged out." });
});

router.get("/loggedin", (req, res, next) => {
  console.log(req.body);
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }
  res.status(403).json({ message: "Unauthorized" });
});

module.exports = router;
