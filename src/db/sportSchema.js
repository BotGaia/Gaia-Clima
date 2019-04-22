const mongoose = require('mongoose');

const SportSchema = new mongoose.Schema({
  name: String,
});

module.exports = SportSchema;
