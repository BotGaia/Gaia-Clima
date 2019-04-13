const http = require('http');
const express = require('express');
const request = require('./commonRequest');

const router = express.Router();

router.get('/request', async (req, res) => {
  const { query: { place: target } } = req;
  let localData = '';
  let localJsonData = '';

  http.get(`http://127.0.0.1:3001/local?address=${target}`, (resp) => {
    resp.on('data', (chunk) => {
      localData += chunk;
    });

    resp.on('end', async () => {
      localJsonData = JSON.parse(localData);

      const { lat } = localJsonData;
      const { lng: lon } = localJsonData;

      await request.commonGet(lat, lon, res);
    });
  });
});
module.exports = app => app.use('/', router);
