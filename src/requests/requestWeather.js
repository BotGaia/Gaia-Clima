const https = require('https');
const express = require('express');
const Weather = require('../models/Weather.js');
const treatment = require('../models/treatmentWeather');

const weather = new Weather();

function jsonToWeather(JsonData, weather) {

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

function jsonToSky(JsonData, weather) {
  try {
    weather.setSky(JsonData.weather[0].description);
    treatment.treatSky();
  } catch (error) {
    weather.setSky('error');
  }
}

function jsonToTemperature(JsonData, weather) {
  try {
    weather.setTemperature(JsonData.main.temp);
    weather.setTemperatureMin(JsonData.main.temp_min);
    weather.setTemperatureMax(JsonData.main.temp_max);
    treatment.treatTemperature();
  } catch (error) {
    weather.setTemperature('error');
    weather.setTemperatureMin('error');
    weather.setTemperatureMax('error'); 
  }

}

function jsonToPressure(JsonData, weather) {
  try {
    weather.setPressure(JsonData.main.pressure);
    treatment.treatPressure();
  } catch (error) {
    weather.setPressure('error');
  }
}

function jsonToWindy(JsonData, weather) {
  try {
    weather.setWindySpeed(JsonData.wind.speed);
    weather.setWindyDegrees(JsonData.wind.deg);
    treatment.treatWindy()
  } catch (error) {
    weather.setWindySpeed('error');
    weather.setWindyDegrees('error');
  }
}

function jsonToSun(JsonData, weather) {
  try {
    weather.setSunrise(JsonData.sys.sunrise);
    weather.setSunset(JsonData.sys.sunset);
    treatment.treatSun();
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
      jsonToWeather(JsonData, weather);
      jsonToSky(JsonData, weather);
      jsonToTemperature(JsonData, weather);
      jsonToPressure(JsonData, weather);
      jsonToWindy(JsonData, weather);
      jsonToSun(JsonData, weather);
      res.json(JsonData);
      console.log(weather.getName());
      console.log(weather.getHumidity());
      console.log(weather.getSky());
      console.log(weather.getSeaLevel());
      console.log(weather.getTemperature());
      console.log(weather.getPressure());
      console.log(weather.getWindyDegrees());
      console.log(weather.getWindySpeed());
      console.log(weather.getSunrise());
      
    });
  });
});
module.exports = app => app.use('/', router);