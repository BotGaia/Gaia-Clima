const https = require('https');
const http = require('http');

module.exports = {
  getLocal: (target) => {
    let localData = '';
    let localJsonData = '';

    return new Promise((resolve) => {
      http.get(`${global.URL_LOCAL}/local?address=${target}`, (resp) => {
        resp.on('data', (chunk) => {
          localData += chunk;
        });

        resp.on('end', () => {
          localJsonData = JSON.parse(localData);
          resolve(localJsonData);
        });
      }).on('error', () => {
        const errorJson = JSON.parse('{"lat":"error","lng":"error"}');
        resolve(errorJson);
      });
    });
  },

  getWeather: (localJson) => {
    const { lat } = localJson;
    const { lng } = localJson;
    let data = '';
    let JsonData = '';
    const apiKey = process.env.API_KEY;

    return new Promise((resolve) => {
      https.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`, (resp) => {
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

  getForecast: (localJson) => {
    const { lat } = localJson;
    const { lng } = localJson;
    let data = '';
    let JsonData = '';
    const apiKey = process.env.API_KEY;

    return new Promise((resolve) => {
      https.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${apiKey}`, (resp) => {
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
