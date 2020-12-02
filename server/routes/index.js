const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../models/User.model");
const Roaster = require("../models/Roaster.model");
const Coffee = require("../models/Coffee.model");

router.post("/add-roaster", (req, res) => {
  console.log(req.body);
  const {
    roasterName,
    roasterAddress,
    roasterUrl,
    logoUrl,
    imageUrl,
  } = req.body;
  Roaster.create({
    roasterName,
    roasterAddress,
    roasterUrl,
    logoUrl,
    imageUrl,
  }).then((result) => {
    res.send(result);
  });
});

module.exports = router;
