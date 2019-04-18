const https = require('https');
const express = require('express');
const Weather = require('../models/Weather.js');

const weather = new Weather(); 

function jsonDataToWeather(JsonData, weather) {

  try {
    weather.setPressure(JsonData.cod);
  } catch (error) {
    weather.setPressure('error');
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
      console.log(weather.getPressure());
      res.json(JsonData);
    });
 });
});
module.exports = app => app.use('/', router);
