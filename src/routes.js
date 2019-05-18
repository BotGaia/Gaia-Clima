const express = require('express');
const requestWeather = require('../src/requests/requestWeather');
const Weather = require('../src/models/Weather');
const Sport = require('./models/Sport');
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
  const resultArray = new Array();
  let i = 0;
  req.body.locals.forEach((local) => {
    requestWeather.getLocal(local).then((coordsJson) => {
      requestWeather.getForecast(coordsJson).then(async (forecastJson) => {
        if (forecastJson.cod === '200') {
          const weatherArray = [];

          forecastJson.list.map(json => weatherArray.push(new Weather(json, 'forecast')));

          const weather = hourlyForecast.getHourlyForecast(weatherArray, req.body.hours, req.body.day, req.body.month, req.body.year);
          const sport = new Sport(req.body.sport);
          await sport.findMe();

          const recommendation = compare.compareWeather(sport.sport, weather);

          if (recommendation === 3) {
            resultArray.push({ sportResult: 'favorable', weather });
          } else if (recommendation === 2) {
            resultArray.push({ sportResult: 'reservation', weather });
          } else if (recommendation === 1) {
            resultArray.push({ sportResult: 'alert', weather });
          } else if (recommendation === 0) {
            resultArray.push({ sportResult: 'not', weather });
          }

          i += 1;

          if (i === req.body.locals.length) {
            res.json(resultArray);
          }
        } else {
          res.json(forecastJson.list);
        }
      });
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
