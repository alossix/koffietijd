const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../models/User.model");
const Roaster = require("../models/Roaster.model");
const Coffee = require("../models/Coffee.model");

router.post("/add-roaster", (req, res) => {
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

router.get("/add-coffee", (req, res) => {
  Roaster.find({})
    .then((allRoasters) => res.json(allRoasters))
    .catch((err) => res.json(err));
});

module.exports = router;

router.post("/add-coffee", (req, res) => {
  console.log(req.body);
  const {
    roaster,
    coffeeName,
    roastStyle,
    coffeeImageUrl,
    countryOfOrigin,
    coffeeDescription,
  } = req.body;
  Coffee.create({
    roaster,
    coffeeName,
    roastStyle,
    coffeeImageUrl,
    countryOfOrigin,
    coffeeDescription,
  })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => console.error(err));
});
