const express = require("express");
const router = express.Router();
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

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log(`inside authenticate session`);
    console.log(
      `req.session.passport: ${JSON.stringify(req.session.passport)}`
    );
    console.log(`req.user: ${JSON.stringify(req.user)}`);
    if (err) {
      res
        .status(500)
        .json({ message: "There was a problem authenticating the user." });
      return;
    }

    if (!user) {
      console.log(`/login ERR !user auth route 2`);
      res.status(401).json(info);
      return;
    }

    req.login(user, (err) => {
      console.log(`/login auth route 3`);
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

router.post("/logout", (req, res, next) => {
  console.log(`/logout auth route 4`);
  req.logout();
  res.status(200).json({ message: "Successfully logged out." });
});

router.get("/loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(`/loggedin auth route 5`);
    res.status(200).json(req.user);
    return;
  }
  console.log(`/loggedin ERR unauthorized`);
  res.status(403).json({ message: "Unauthorized" });
});

module.exports = router;
