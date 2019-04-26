const mongoose = require('mongoose');
const Weather = require('../models/Weather');
const requestWeather = require('../requests/requestWeather');
const SportSchema = require('../db/sportSchema');

const SportModel = mongoose.model('SportModel', SportSchema);


module.exports = {
  compare(place) {
    return new Promise((resolve) => {
      this.getClima(place).then((weather) => {
        this.getAllSports().then((array) => {
          resolve(this.divideArrays(array, weather));
        });
      });
    });
  },

  divideArrays(array, weather) {
    let count = 0;
    const objectOfSports = { favorable: [], reservation: [], alert: [] };
    for (let i = 0; i < array.length; i += 1) {
      if (this.compareTemperature(array[i], weather)) {
        count += 1;
      }
      if (this.compareHumidity(array[i], weather)) {
        count += 1;
      }
      if (this.compareWindSpeed(array[i], weather)) {
        count += 1;
      }
      if (count === 3) {
        objectOfSports.favorable.push(array[i]);
      } else if (count === 2) {
        objectOfSports.reservation.push(array[i]);
      } else if (count === 1) {
        objectOfSports.alert.push(array[i]);
      }
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

  getClima(place) {
    return new Promise((resolve) => {
      requestWeather.getLocal(place).then((coordsJson) => {
        requestWeather.getWeather(coordsJson).then((weatherJson) => {
          if (weatherJson.cod === 200) {
            const weather = new Weather(weatherJson);
            resolve(weather);
          } else {
            resolve(weatherJson);
          }
        });
      });
    });
  },

  compareTemperature: (sport, weather) => {
    for (let i = 0; i < sport.temperature.limitArray.length; i += 1) {
      if (parseFloat(weather.temperature) >= parseFloat(sport.temperature.limitArray[i].lowerLimit)
      && parseFloat(weather.temperature)
      <= parseFloat(sport.temperature.limitArray[i].upperLimit)) {
        return true;
      }
    }
    return false;
  },

  compareHumidity: (sport, weather) => {
    for (let i = 0; i < sport.humidity.limitArray.length; i += 1) {
      if (parseFloat(weather.humidity) >= parseFloat(sport.humidity.limitArray[i].lowerLimit)
      && parseFloat(weather.humidity) <= parseFloat(sport.humidity.limitArray[i].upperLimit)) {
        return true;
      }
    }
    return false;
  },


  compareWindSpeed: (sport, weather) => {
    for (let i = 0; i < sport.windSpeed.limitArray.length; i += 1) {
      if (parseFloat(weather.windySpeed) >= parseFloat(sport.windSpeed.limitArray[i].lowerLimit)
      && parseFloat(weather.windySpeed) <= parseFloat(sport.windSpeed.limitArray[i].upperLimit)) {
        return true;
      }
    }
    return false;
  },

};
