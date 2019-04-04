/* eslint-disable import/no-unresolved */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const https = require('https');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/request/:lati/:long', (req, res) => {
  //  const lat = req.params.lati
  const { params: { lati: lat } } = req;
  //  const lat = req.params.long
  const { params: { long: lon } } = req;
  let data = '';
  let JsonData = '';

  https.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=652aee6b1beb9ead3681837980b21671`, (resp) => {
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      JsonData = JSON.parse(data);
      res.json(JsonData);
    });
  });
});
app.get('/', (req, res) => {
  res.json({ Hello: 'World' });
});

app.listen(3000);

module.exports = app;
