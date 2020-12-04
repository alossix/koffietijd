const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../models/User.model");

router.post("/signup", (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  if (password.length < 7) {
    res
      .status(400)
      .json({ message: "Passwords require a minimum of 8 characters." });
    return;
  }
  const salt = bcrypt.genSaltSync(10);
  bcrypt.hash(password, salt).then((hashedPassword) => {
    User.findOne({ email }, (err, foundUser) => {
      if (err) {
        res.status(500).json({ message: "Please check your email." });
        return;
      }
      if (foundUser) {
        res
          .status(400)
          .json({ message: "Email in use. Please choose a different one." });
        return;
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
          res.status(500).json({ message: "There was a problem logging in." });
          return;
        }

        res.status(200).json(newUser);
      });
    });
  });
});

router.post("/login", (req, res) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "There was a problem authenticating the user." });
      return;
    }

    if (!user) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(user, (err) => {
      if (err) {
        res
          .status(500)
          .json({ message: "There was a problem saving the session." });
        return;
      }
    });

    res.status(200).json(user);
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Successfully logged out." });
});

router.get("/loggedin", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

module.exports = router;
