/*const sport = require('../models/Sport');
const Weather = require('../models/Weather');
*/
module.exports = {
    compareTemperature: (sport, weather) => {
        if (weather.temperature >= sport.temperature.lowerLimit && weather.temperature <= sport.temperature.upperLimit) {
            // entra na condição
        }
        else {
            // não entra na condição
        }
    },

    compareHumidity: (sport, weather) => {
        if (weather.humidity >= sport.humidity.lowerLimit && weather.humidity <= sport.humidity.upperLimit) {
            // entra na condição
        }
        else {
            // não entra na condição
        }
    },

    compareWindSpeed: (sport, weather) => {
        if (weather.windySpeed >= sport.windSpeed.lowerLimit && weather.windySpeed <= sport.windSpeed.upperLimit) {
            //entra na condição
        }
        else {
            // não entra na condição
        }
    },
}