const express = require('express');
const requestWeather = require('../src/requests/requestWeather');
const Weather = require('../src/models/Weather');
const util = require('./utils/compareSportWithWeather');

const router = express.Router();

router.get('/climate', (req, res) => {
  requestWeather.getLocal(req.query.place).then((coordsJson) => {
    requestWeather.getWeather(coordsJson).then((weatherJson) => {
      if (weatherJson.cod === 200) {
        const weather = new Weather(weatherJson, 'weather');
        res.json(weather);
      } else {
        res.json(weatherJson);
      }
    });
  });
});

router.get('/forecast', (req, res) => {
  requestWeather.getLocal(req.query.place).then((coordsJson) => {
    requestWeather.getForecast(coordsJson).then((forecastJson) => {
      if (forecastJson.cod === '200') {
        let weatherArray = new Array(40);

        for(counter = 0; counter < 40; counter += 1) {
          weatherArray[counter] = new Weather(forecastJson.list[counter], 'forecast');
        }

        res.json(weatherArray);
      } else {
        res.json(forecastJson.list);
      }
    });
  });
});

router.get('/sports', (req, res) => {
  requestWeather.getLocal(req.query.place).then((coordsJson) => {
    requestWeather.getWeather(coordsJson).then((weatherJson) => {
      if (weatherJson.cod === 200) {
        const weather = new Weather(weatherJson);
        util.compare(weather).then((objectOfSports) => {
          res.json(objectOfSports);
        });
      } else {
        res.json(weatherJson);
      }
    });
  });
});

router.get('/allSports', (req, res) => {
  util.getAllSports().then((array) => {
    res.json(array);
  });
});


module.exports = app => app.use('/', router);
