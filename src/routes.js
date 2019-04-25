const express = require('express');
const requestWeather = require('../src/requests/requestWeather');
const Weather = require('../src/models/Weather');
const Sport = require('../src/models/Sport');
const util = require("./utils/compareSportWithWeather");

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
    console.log(objectOfSports)
    res.json(objectOfSports);
  });
})



module.exports = app => app.use('/', router);
