const https = require('https');
const express = require('express');

const router = express.Router();

router.get('/simulation', async (req, res) => {
  const { query: { place: target } } = req;
  let data = '';
  let JsonData = '';
  const apiKey = process.env.API_KEY;
  const localData = '{"lat":-15.7934036,"lng":-47.8823172}';
  const localJsonData = JSON.parse(localData);
  let lati = '';
  let lon = '';
  if (target === 'brasilia') {
    lati = localJsonData.lat;
    lon = localJsonData.lng;
  } else {
    lati = 'undefined';
    lon = 'undefined';
  }
  https.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${lon}&appid=${apiKey}`, (response) => {
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      JsonData = JSON.parse(data);
      res.json(JsonData);
    });
  });
});
module.exports = app => app.use('/', router);
