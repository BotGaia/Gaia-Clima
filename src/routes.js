const express = require('express');
const request = require('../src/requests/requestWeather');
const treatment = require('./utils/treatmentWeather');
const Weather = require('../src/models/Weather');

const router = express.Router();


router.get('/request', (req, res) => {
  request.getWeather(req.query.lat, req.query.lon).then((JsonData) => {
    if (JsonData.cod === '200') {
      const weather = new Weather(JsonData);      
      res.json(weather);
    }
    res.json(JsonData);
  });
});

module.exports = app => app.use('/', router);
