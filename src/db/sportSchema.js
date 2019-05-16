const mongoose = require('mongoose');

const SportSchema = new mongoose.Schema({
  name: String,
  class: String,
  temperature: {
    type: Array,
    intervals: {
      type: Object
    }, 
  },
  humidity:{ 
    type: Array,
    intervals: {
      type: Object
    }, 
  },
  windSpeed: {
    type: Array,
    intervals: {
      type: Object
    }, 
  }
});

module.exports = SportSchema;
