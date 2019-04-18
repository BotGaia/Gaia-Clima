const https = require('https');
const express = require('express');
const Weather = require('../models/Weather.js');

const weather = new Weather(); 

function jsonDataToWeather(JsonData, weather) {

  try {
    weather.setName(JsonData.name);
    weather.setHumidity(JsonData.main.humidity);
    weather.setSeaLevel(JsonData.main.sea_level);


  } catch (error) {
    weather.setName('error');
    weather.setHumidity('error');
    weather.setSeaLevel('error');
  }
}

function treatSky(JsonData, weather) {
  try {
    weather.setSky(JsonData.weather[0].description);
  } catch (error) {
    weather.setWeather('error');
  }
}

function treatTemperature(JsonData, weather) {
  try {
    weather.setTemperature(JsonData.main.temp);
    weather.setTemperatureMin(JsonData.main.temp_min);
    weather.setTemperatureMax(JsonData.main.temp_max);
  } catch (error) {
    weather.setTemperature('error');
    weather.setTemperatureMin('error');
    weather.setTemperatureMax('error');   
  } 
}

function treatPressure(JsonData, weather) {
  try {
    weather.setPressure(JsonData.main.pressure);
  } catch (error) {
    weather.setPressure('error');
  }
}

function treatWind(JsonData, weather) {
  try {
    weather.setWindySpeed(JsonData.wind.speed);
    weather.setWindyDegrees(JsonData.wind.deg);
  } catch (error) {
    weather.setWindySpeed('error');
    weather.setWindyDegrees('error');
  }

}

function treatSun(JsonData, weather) {
  try {
    weather.setSunrise(JsonData.sys.sunrise);
    weather.setSunset(JsonData.sys.sunset); 
  } catch (error) {
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
      treatSky(JsonData, weather);
      treatTemperature(JsonData, weather);
      treatPressure(JsonData, weather);
      treatWind(JsonData, weather);
      treatSun(JsonData, weather);

      res.json(JsonData);
    });
 });
});
module.exports = app => app.use('/', router);
