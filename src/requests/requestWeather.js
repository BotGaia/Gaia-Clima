const axios = require('axios');

module.exports = {
  getLocal: target => new Promise((resolve) => {
    axios.get(`${global.URL_LOCAL}/local`, {
      params: {
        address: target,
      },
    }).then((response) => {
      resolve(response.data);
    }).catch((err) => {
      resolve(err);
    });
  }),

  getWeather: (localJson) => {
    const params = {
      lat: localJson.lat,
      lon: localJson.lng,
      appid: process.env.API_KEY,
    };

    return new Promise((resolve) => {
      axios.get('https://api.openweathermap.org/data/2.5/weather', { params })
        .then((response) => {
          resolve(response.data);
        }).catch((err) => {
          resolve(err.response.data);
        });
    });
  },

  getForecast: (localJson) => {
    const params = {
      lat: localJson.lat,
      lon: localJson.lng,
      appid: process.env.API_KEY,
    };

    return new Promise((resolve) => {
      axios.get('https://api.openweathermap.org/data/2.5/forecast', { params })
        .then((response) => {
          resolve(response.data);
        }).catch((err) => {
          resolve(err.response.data);
        });
    });
  },
};
