const express = require('express');
const requestWeather = require('../src/requests/requestWeather');
const Weather = require('../src/models/Weather');
const util = require('./utils/compareSportWithWeather');

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

router.get('/requestSport', (req, res) => {
  util.compare(req.query.place).then((objectOfSports) => {
    res.json(objectOfSports);
  });
});

router.get('/allSports', (req, res) => {
  util.getAllSports().then((array) => {
    res.json(array);
  });
});


module.exports = app => app.use('/', router);
