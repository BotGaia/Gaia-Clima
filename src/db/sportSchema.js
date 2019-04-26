const mongoose = require('mongoose');

const SportSchema = new mongoose.Schema({
  name: String,
  class: String,
  temperature: {
    limitArray: Array,
  },
  humidity: {
    limitArray: Array,
  },
  windSpeed: {
    limitArray: Array,
  },
});

module.exports = SportSchema;
