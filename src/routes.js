const express = require('express');
const requestWeather = require('../src/requests/requestWeather');
const Weather = require('../src/models/Weather');
const comparation = require('./utils/compareSportWithWeather');
const sportForecastRecommendation = require('./utils/sportForecastRecommendation');
const endpoints = require('./utils/endpoints');
const hourlyForecast = require('./utils/hourlyForecast');

const router = express.Router();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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

        res.json(
          hourlyForecast
            .getHourlyForecast(
              weatherArray,
              req.query.hours,
              req.query.day,
              req.query.month,
              req.query.year,
            ),
        );
      } else {
        res.json(forecastJson.list);
      }
    });
  });
});

router.post('/sportForecast', (req, res) => {
  const resultArray = [];
  let i = 0;
  req.body.locals.forEach((local) => {
    requestWeather.getLocal(local).then((coordsJson) => {
      requestWeather.getForecast(coordsJson).then(async (forecastJson) => {
        if (forecastJson.cod === '200') {
          const weatherArray = [];
          
          forecastJson.list.map(json => weatherArray.push(new Weather(json, 'forecast')));
          
          const resultItem = await sportForecastRecommendation
          .getForecastRecommendation(weatherArray, req.body);
          
          resultArray.push(resultItem);
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
        comparation.compare(weather).then((objectOfSports) => {
          res.json(objectOfSports);
        });
      } else {
        res.json(weatherJson);
      }
    });
  });
});

router.get('/allSports', (req, res) => {
  comparation.getAllSports().then((array) => {
    res.json(array);
  });
});

module.exports = app => app.use('/', router);
