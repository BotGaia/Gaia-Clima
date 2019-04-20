const https = require('https');
const http = require('http');

const targetIp = process.env.IP_ADDRESS;

module.exports = {
  getLocal: (target) => {
    let localData = '';
    let localJsonData = '';
    let URL = '';

    if (process.env.ENVIRONMENT === 'dev') {
      URL = `http://${targetIp}:3001/local?address=${target}`;
    } else if (process.env.ENVIRONMENT === 'homolog') {
      URL = `http://68.183.43.29:31170/local?address=${target}`;
    }

    return new Promise((resolve) => {
      http.get(URL, (resp) => {
        resp.on('data', (chunk) => {
          localData += chunk;
        });

        resp.on('end', () => {
          localJsonData = JSON.parse(localData);
          resolve(localJsonData);
        });
      });
    });
  },

  getWeather: (lat, lon) => {
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
