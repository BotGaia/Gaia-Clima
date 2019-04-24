const express = require('express');
const requestWeather = require('../src/requests/requestWeather');
const Weather = require('../src/models/Weather');
const Sport = require('../src/models/Sport')

const router = express.Router();

router.get('/request', (req, res) => {
  requestWeather.getLocal(req.query.place).then((coordsJson) => {
    requestWeather.getWeather(coordsJson).then((weatherJson) => {
      if (weatherJson.cod === 200) {
        const weather = new Weather(weatherJson);
        res.json(weather);
      } else {
        res.json(weatherJson);
      }
    });
  });
});



module.exports = app => app.use('/', router);
