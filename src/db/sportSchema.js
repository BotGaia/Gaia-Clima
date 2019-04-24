const mongoose = require('mongoose');

const SportSchema = new mongoose.Schema({
  name: String,
  temperature: {
    upperLimit: String,
    lowerlimit: String,
  },
  humidity: {
    upperLimit: String,
    lowerlimit: String,
  },
  windSpeed: {
    upperLimit: String,
    lowerlimit: String,
  },
});

module.exports = SportSchema;
