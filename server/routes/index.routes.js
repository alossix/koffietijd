const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("user logged in", req.user);
    next();
  } else {
    console.log("user not logged in");
  }
  res.render("index");
});

module.exports = router;
