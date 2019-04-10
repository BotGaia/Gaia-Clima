const https = require('https');
const express = require('express');

const router = express.Router();

router.get('/requestLocal', async (req, res) => {
  let data = '';
  let JsonData = '';
  const apiKey = process.env.API_KEY;

  https.get(`https://localhost:3001/local?adress=${adress}`, (resp) => {
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
