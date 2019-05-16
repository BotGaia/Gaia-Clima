const express = require('express');
const requestWeather = require('../src/requests/requestWeather');
const Weather = require('../src/models/Weather');
const compare = require('./utils/compareSportWithWeather');
const endpoints = require('./utils/endpoints');
const hourlyForecast = require('./utils/hourlyForecast');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(endpoints.getJson());
});

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
        const weatherArray = [];

        forecastJson.list.map(json => weatherArray.push(new Weather(json, 'forecast')));

        res.json(weatherArray);
      } else {
        res.json(forecastJson.list);
      }
    });
  });
});

router.get('/climateForecast', (req, res) => {
  requestWeather.getLocal(req.query.place).then((coordsJson) => {
    requestWeather.getForecast(coordsJson).then((forecastJson) => {
      if (forecastJson.cod === '200') {
        const weatherArray = [];

        forecastJson.list.map(json => weatherArray.push(new Weather(json, 'forecast')));

        res.json(hourlyForecast.getHourlyForecast(weatherArray, req.query.hours, req.query.day, req.query.month, req.query.year));

        
      } else {
        res.json(forecastJson.list);
      }
    });
  });
});

router.get('/sportForecast', (req, res) => {
  requestWeather.getLocal(req.query.place).then((coordsJson) => {
    requestWeather.getForecast(coordsJson).then((forecastJson) => {
      if (forecastJson.cod === '200') {
        const weatherArray = [];

        forecastJson.list.map(json => weatherArray.push(new Weather(json, 'forecast')));

        const weather = hourlyForecast.getHourlyForecast(weatherArray, req.query.hours, req.query.day, req.query.month, req.query.year);

        if(compare.compareWeather(req.query.sport, weather)) {
          res.send({result: "true"}, weather);
        } else {
          res.send({result: "false"}, weather);
        }
        
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
        compare.compare(weather).then((objectOfSports) => {
          res.json(objectOfSports);
        });
      } else {
        res.json(weatherJson);
      }
    });
  });
});

router.get('/allSports', (req, res) => {
  compare.getAllSports().then((array) => {
    res.json(array);
  });
});


module.exports = app => app.use('/', router);
