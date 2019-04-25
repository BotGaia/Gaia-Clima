const mongoose = require('mongoose');

const SportSchema = new mongoose.Schema({
  name: String,
  class: String,
  temperature: {
    upperLimit: String,
    lowerLimit: String,
  },
  humidity: {
    upperLimit: String,
    lowerLimit: String,
  },
  windSpeed: {
    upperLimit: String,
    lowerLimit: String,
  },
});

module.exports = SportSchema;
