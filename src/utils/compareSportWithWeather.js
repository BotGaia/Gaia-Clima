const sport = require('../models/Sport');
const Weather = require('../models/Weather');
const requestWeather = require('../requests/requestWeather');


const mongoose = require('mongoose');
const mongooseConnection = require("../config/mongooseConnection")
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
        let count=0;
        let objectOfSports = { favorable: [], reservation: [], alert: [] };
        for (let i = 0; i < array.length; i++) {
            console.log("array================="+array[i])
            if (this.compareTemperature(array[i], weather)) {
            console.log("fuckonashize-----------------------r")
                count++;
            }
            if (this.compareHumidity(array[i], weather)) {
                console.log("fuckonashize-----------------------r")
                count++;
            }
            if (this.compareWindSpeed(array[i], weather)) {
                console.log("fuckonashize-----------------------r")
                count++;
            }
            if (count == 3) {
                objectOfSports.favorable.push(array[i]);
            } else if (count == 2) {
                objectOfSports.reservation.push(array[i]);
            } else if (count == 1) {
                objectOfSports.alert.push(array[i]);
            }
            count = 0;
        }
        return objectOfSports;
    },

    getAllSports() {
        mongooseConnection.connect();
        return new Promise((resolve) => {
            SportModel.find({ class: 'sport' }).then((array) => {
                resolve(array);
            }).catch((err) => {
            });
        })
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
        if (parseFloat(weather.temperature) >= parseFloat(sport.temperature.lowerLimit) && parseFloat(weather.temperature) <= parseFloat(sport.temperature.upperLimit)) {
            console.log("fuckonashize-----------------------r")
            return true;
        }
        else {
            return false;
        }
    },

    compareHumidity: (sport, weather) => {
        if (parseFloat(weather.humidity) >= parseFloat(sport.humidity.lowerLimit) && parseFloat(weather.humidity) <= parseFloat(sport.humidity.upperLimit)) {
            return true;
        }
        else {
            return false;
        }
    },

    compareWindSpeed: (sport, weather) => {
        if (parseFloat(weather.windySpeed) >= parseFloat(sport.windSpeed.lowerLimit) && parseFloat(weather.windySpeed) <= parseFloat(sport.windSpeed.upperLimit)) {
            return true;
        }
        else {
            return false;
        }
    },
}