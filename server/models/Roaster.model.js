const mongoose = require("mongoose");

const roasterSchema = new mongoose.Schema({
  roasterName: {
    type: String,
    index: true,
    required: [true, "Roaster name is required"],
  },
  roasterAddress: {
    type: String,
    required: [true, "Roaster address is required"],
  },
  roasterUrl: {
    type: String,
    validate: {
      validator: function (value) {
        const urlPattern = /(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%#!\-/]))?/;
        const urlRegExp = new RegExp(urlPattern);
        return value.match(urlRegExp);
      },
      message: `Please provide a valid URL.`,
    },
  },
  logoUrl: {
    type: String,
    validate: {
      validator: function (value) {
        const urlPattern = /(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%#!\-/]))?/;
        const urlRegExp = new RegExp(urlPattern);
        return value.match(urlRegExp);
      },
      message: `Please provide a valid URL.`,
    },
  },
  webshopUrl: {
    type: String,
    validate: {
      validator: function (value) {
        const urlPattern = /(http|https):\/\/(\w+:{0,1}\w*#)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%#!\-/]))?/;
        const urlRegExp = new RegExp(urlPattern);
        return value.match(urlRegExp);
      },
      message: `Please provide a valid URL.`,
    },
  },
  coffeeList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Coffee" }],
  added: {
    type: Date,
    default: Date.now,
  },
});

const Roaster = mongoose.model("Roaster", roasterSchema);
module.exports = Roaster;
