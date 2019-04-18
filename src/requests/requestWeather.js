const https = require('https');
const express = require('express');
const Weather = require('../models/Weather.js');

const weather = new Weather(); 

function jsonDataToWeather(JsonData, weather) {

  try {
    weather.setName(JsonData.name);
    weather.setWeather(JsonData.weather[0].description);
    weather.setTemperature(JsonData.main.temp);
    weather.setPressure(JsonData.main.pressure);
    weather.setHumidity(JsonData.main.humidity);
    weather.setTemperatureMin(JsonData.main.temp_min);
    weather.setTemperaturaMax(JsonData.main.temp_max);
    weather.setSeaLevel(JsonData.main.sea_level);
    weather.setWindySpeed(JsonData.wind.speed);
    weather.setWindyDegrees(JsonData.wind.deg);
    weather.setSunrise(JsonData.sys.sunrise);
    weather.setSunset(JsonData.sys.sunset);
  } catch (error) {
    weather.setName('error');
    weather.setWeather('error');
    weather.setTemperature('error');
    weather.setPressure('error');
    weather.setHumidity('error');
    weather.setTemperatureMin('error');
    weather.setTemperaturaMax('error');
    weather.setSeaLevel('error');
    weather.setWindySpeed('error');
    weather.setWindyDegrees('error');
    weather.setSunrise('error');
    weather.setSunset('error');
  }
}

const router = express.Router();

router.get('/request', async (req, res) => {
  const { query: { lati: lat } } = req;
  const { query: { long: lon } } = req;
  let data = '';
  let JsonData = '';
  const apiKey = process.env.API_KEY;

  https.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`, (resp) => {
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      JsonData = JSON.parse(data);
      jsonDataToWeather(JsonData, weather);
      res.json(JsonData);
    });
 });
});
module.exports = app => app.use('/', router);
