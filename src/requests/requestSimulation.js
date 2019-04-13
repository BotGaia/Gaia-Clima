const express = require('express');
const request = require('./commonRequest');

const router = express.Router();

router.get('/simulation', async (req, res) => {
  const { query: { place: target } } = req;
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

  await request.commonGet(lati, lon, res);
});
module.exports = app => app.use('/', router);
