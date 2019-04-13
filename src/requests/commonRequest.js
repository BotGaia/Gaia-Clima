const https = require('https');

exports.commonGet = (lati, lon, res) => {
  let data = '';
  let JsonData = '';
  const apiKey = process.env.API_KEY;
  https.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${lon}&appid=${apiKey}`, (response) => {
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      JsonData = JSON.parse(data);
      res.json(JsonData);
    });
  });
};
