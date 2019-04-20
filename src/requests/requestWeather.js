const https = require('https');

module.exports = {

  getWeather: (lat,lon) => {
    let data = '';
    let JsonData = '';
    const apiKey = process.env.API_KEY;

    return new Promise((resolve) => {
      https.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`, (resp) => {
        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          JsonData = JSON.parse(data);
          resolve(JsonData);
        });
      });
    });
  },
};
