const mongoose = require("mongoose");

const coffeeSchema = new mongoose.Schema({
  roaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roaster",
    required: [
      true,
      "Please select an existing roaster or first add a new one",
    ],
  },
  coffeeName: {
    type: String,
    index: true,
    required: [true, "Coffee name is required"],
  },
  roastStyle: {
    type: String,
    required: [
      true,
      "Roast style is required (e.g., dark roast, blond roast, Italian roast)",
    ],
  },
  coffeeImageUrl: {
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
  coffeePageUrl: {
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
  countryOfOrigin: String,
  price: String,
  coffeeDescription: {
    type: String,
    required: [true, "Please enter a description of the coffee"],
  },
});

const Coffee = mongoose.model("Coffee", coffeeSchema);
module.exports = Coffee;
