const https = require('https');
const express = require('express');

const router = express.Router();

router.get('/simulation', async (req, res) => {
  const { query: { place: target } } = req;
  let simulationdata = '';
  let SimulationJsonData = '';
  const apiKey = process.env.API_KEY;
  const slocalData = '{"lat":-15.7934036,"lng":-47.8823172}';
  const slocalJsonData = JSON.parse(slocalData);
  let lati = '';
  let lon = '';
  if (target === 'brasilia') {
    lati = slocalJsonData.lat;
    lon = slocalJsonData.lng;
  } else {
    lati = 'undefined';
    lon = 'undefined';
  }
  https.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${lon}&appid=${apiKey}`, (response) => {
    response.on('data', (chunk) => {
      simulationdata += chunk;
    });
    response.on('end', () => {
      SimulationJsonData = JSON.parse(simulationdata);
      res.json(SimulationJsonData);
    });
  });
});
module.exports = app => app.use('/', router);