const mongoose = require('mongoose');

const SportSchema = new mongoose.Schema({
  name: String,
  class: String,
  temperature: {
    type: Array,
    intervals: {
      type: Object,
      upperLimit: String,
      lowerLimit: String
      
    }, 
  },
  humidity:{ 
    type: Array,
    intervals: {
      type: Object,
      upperLimit: String,
      lowerLimit: String
    }, 
  },
  windSpeed: {
    type: Array,
    intervals: {
      type: Object,
      upperLimit: String,
      lowerLimit: String
    }, 
  }
});

module.exports = SportSchema;
