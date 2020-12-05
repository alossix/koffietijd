const express = require("express");
const router = express.Router();

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
    res.status(200).json(result);
  });
});

router.get("/add-coffee", (req, res) => {
  Roaster.find({})
    .then((allRoasters) => res.status(200).json(allRoasters))
    .catch((err) => res.json(err));
});

router.post("/add-coffee", (req, res) => {
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
      res.status(200).json(result);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
