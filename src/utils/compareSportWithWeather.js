const mongoose = require('mongoose'); const SportSchema = require('../db/sportSchema');

const SportModel = mongoose.model('SportModel', SportSchema);

module.exports = {
  compare(weather) {
    return new Promise((resolve) => {
      this.getAllSports().then((array) => {
        resolve(this.divideArrays(array, weather));
      });
    });
  },

  divideArrays(array, weather) {
    let count = 0;
    const objectOfSports = { favorable: [], reservation: [], alert: [] };
    for (let i = 0; i < array.length; i += 1) {
      when (this.compareTemperature(array[i], weather)).done(count += 1);
      when (this.compareHumidity(array[i], weather)).done(count += 1);
      when (this.compareWindSpeed(array[i], weather)).done(count += 1);
      when (count === 3).done( objectOfSports.favorable.push(array[i]));
      when (count === 2).done(objectOfSports.reservation.push(array[i]));
      when (count === 1).done(objectOfSports.alert.push(array[i]));
      count = 0;
    }
    return objectOfSports;
  },

  getAllSports() {
    return new Promise((resolve) => {
      SportModel.find({ class: 'sport' }).then((array) => {
        resolve(array);
      }).catch(() => {
      });
    });
  },

  compareTemperature: (sport, weather) => {
    for (let i = 0; i < sport.temperature.intervals.size(); i += 1) {
      if (parseFloat(weather.temperature) >= parseFloat(sport.temperature.intervals[i].lowerLimit)
      && parseFloat(weather.temperature)
      <= parseFloat(sport.temperature.intervals[i].upperLimit)) {
        return true;
      }
    }
    return false;
  },

  compareHumidity: (sport, weather) => {
    for (let i = 0; i < sport.humidity.intervals.size(); i += 1) {
      if (parseFloat(weather.humidity) >= parseFloat(sport.humidity.intervals[i].lowerLimit)
      && parseFloat(weather.humidity) <= parseFloat(sport.humidity.intervals[i].upperLimit)) {
        return true;
      }
    }
    return false;
  },

  compareWindSpeed: (sport, weather) => {
    for (let i = 0; i < sport.windSpeed.intervals.size(); i += 1) {
      if (parseFloat(weather.windySpeed) >= parseFloat(sport.windSpeed.intervals[i].lowerLimit)
      && parseFloat(weather.windySpeed) <= parseFloat(sport.windSpeed.intervals[i].upperLimit)) {
        return true;
      }
    }
    return false;
  },
};
