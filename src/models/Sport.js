const mongoose = require('mongoose');
const SportSchema = require('../db/sportSchema');

const SportModel = mongoose.model('SportModel', SportSchema);

module.exports = class Sport {
  constructor(name) {
    this.sport = new SportModel({
      name,
    });
  }


  getSport() {
    return this.sport;
  }

  saveSport() {
    this.sport.save();
  }

  findMe() {
    return new Promise((resolve) => {
      SportModel.findOne({ name: this.sport.name },
        (err) => { if (err) { resolve(false); } }).then((sport) => {
          if (sport) {
            this.sport = sport;
            resolve(true);
          }

          resolve(false);
        });
    });
  }
}