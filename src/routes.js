const express = require('express');
const request = require('../src/requests/requestWeather');
const treatment = require('../src/models/treatmentWeather');
const Weather = require('../src/models/Weather');

const router = express.Router();


router.get('/request', (req, res) => {
  request.getWeather(req.query.lat, req.query.lon).then((JsonData) => {
    const weather = new Weather();
    treatment.treat(JsonData, weather);

    res.json(weather);
  });
});

module.exports = app => app.use('/', router);
