const https = require('https');
const express = require('express');

const router = express.Router();

router.get('/request', async (req, res) => {
  //  const lat = req.params.lati
  const { query: { lati: lat } } = req;
  //  const lat = req.params.long
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
      res.json(JsonData);
    });
  });
});
module.exports = app => app.use('/', router);
