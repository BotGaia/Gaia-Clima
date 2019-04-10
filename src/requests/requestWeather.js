const https = require('https');
const http = require('http');
const express = require('express');

const router = express.Router();

router.get('/request', async (req, res) => {
  const { query: { place: target } } = req;
  let localData = '';
  let localJsonData = '';

  let data = '';
  let JsonData = '';
  const apiKey = process.env.API_KEY;

  http.get(`http://127.0.0.1:3001/local?address=${target}`, (resp) => {
    resp.on('data', (chunk) => {
      localData += chunk;
    });

    resp.on('end', () => {
      localJsonData = JSON.parse(localData);

      const { lat } = localJsonData;
      const { lng: lon } = localJsonData;

      https.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`, (response) => {
        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          JsonData = JSON.parse(data);
          res.json(JsonData);
        });
      });
    });
  });
});
module.exports = app => app.use('/', router);
