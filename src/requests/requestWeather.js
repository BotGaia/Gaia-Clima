const https = require('https');
const express = require('express');
const Weather = require('../models/Weather.js');

const weather = new Weather();

function jsonDataToWeather(JsonData) {
  try {
    weather.setName(JsonData.name);
    weather.setHumidity(JsonData.main.humidity);
    weather.setSeaLevel(JsonData.main.sea_level);
  } catch (error) {
    weather.setName('error');
    weather.setHumidity('error');
    weather.setSeaLevel('error');
  }
}

function treatSky(JsonData) {
  try {
    weather.setSky(JsonData.weather[0].description);
    if (weather.getSky() === 'clear sky') {
      weather.setSky('céu limpo');
    }
    if (weather.getSky() === 'few clouds') {
      weather.setSky('poucas nuvens');
    }
    if (weather.getSky() === 'broken clouds') {
      weather.setSky('céu parcialmente nublado');
    }
    if (weather.getSky() === 'scattered clouds') {
      weather.setSky('nuvens dispersas');
    }
    if (weather.getSky() === 'moderate rain') {
      weather.setSky('chuva moderada');
    }
    if (weather.getSky() === 'light rain') {
      weather.setSky('leve chuva');
    }
    if (weather.getSky() === 'overcast clouds') {
      weather.setSky('céu nublado');
    }
    if (weather.getSky() === 'light intensity') {
      weather.setSky('sol forte');
    }
    if (weather.getSky() === 'shower rain') {
      weather.setSky('chuva intensa');
    }
    if (weather.getSky() === 'heavy snow') {
      weather.setSky('neve intensa');
    }
  } catch (error) {
    weather.setSky('error');
  }
}

function treatTemperature(JsonData) {
  try {
    weather.setTemperature(JsonData.main.temp);
    weather.setTemperatureMin(JsonData.main.temp_min);
    weather.setTemperatureMax(JsonData.main.temp_max);

    const kel = parseFloat(weather.getTemperature());
    const kelMax = parseFloat(weather.getTemperatureMax());
    const kelMin = parseFloat(weather.getTemperatureMin());

    const celsius = kel - 273.15;
    const celsiusMax = kelMax - 273.15;
    const celsiusMin = kelMin - 273.15;

    weather.setTemperature(celsius.toString());
    weather.setTemperatureMax(celsiusMax.toString());
    weather.setTemperatureMin(celsiusMin.toString());
  } catch (error) {
    weather.setTemperature('error');
    weather.setTemperatureMin('error');
    weather.setTemperatureMax('error');
  }
}
function treatPressure(JsonData) {
  try {
    weather.setPressure(JsonData.main.pressure);
    const hpa = parseFloat(weather.getPressure());
    const nm = 100 * hpa;
    weather.setPressure(nm.toString());
  } catch (error) {
    weather.setPressure('error');
  }
}

function treatWind(JsonData) {
  try {
    weather.setWindySpeed(JsonData.wind.speed);
    weather.setWindyDegrees(JsonData.wind.deg);

    const ang = parseFloat(weather.getWindyDegrees());
    if (ang >= 337.5 && ang < 22.5) {
      weather.setWindyDegrees('leste');
    }
    if (ang >= 22.5 && ang < 67.5) {
      weather.setWindyDegrees('nordeste');
    }
    if (ang >= 67.5 && ang < 112.5) {
      weather.setWindyDegrees('norte');
    }
    if (ang >= 112.5 && ang < 157.5) {
      weather.setWindyDegrees('noroeste');
    }
    if (ang >= 157.5 && ang < 202.5) {
      weather.setWindyDegrees('oeste');
    }
    if (ang >= 202.5 && ang < 247.5) {
      weather.setWindyDegrees('sudoeste');
    }
    if (ang >= 247.5 && ang < 292.5) {
      weather.setWindyDegrees('sul');
    }
    if (ang >= 292.5 && ang < 337.5) {
      weather.setWindyDegrees('sudeste');
    }
  } catch (error) {
    weather.setWindySpeed('error');
    weather.setWindyDegrees('error');
  }
}

function treatSun(JsonData) {
  try {
    weather.setSunrise(JsonData.sys.sunrise);
    weather.setSunset(JsonData.sys.sunset);

    const sunr = parseInt(weather.getSunrise());
    const suns = parseInt(weather.getSunset());

    const sr = new Date(sunr).toLocaleTimeString("pt-BR");
    const ss = new Date(suns).toLocaleTimeString("pt-BR");
    weather.setSunset(ss.toString());
    weather.setSunrise(sr.toString());
  } catch (error) {
    weather.setSunrise('error');
    weather.setSunset('error');
  }
}

const router = express.Router();

router.get('/request', async (req, res) => {
  const { query: { lati: lat } } = req;
  const { query: { long: lon } } = req;
  let data = '';
  let JsonData = '';
  const apiKey = process.env.API_KEY;

  https.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`, (resp) => {
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      JsonData = JSON.parse(data);
      jsonDataToWeather(JsonData, weather);
      treatSky(JsonData, weather);
      treatTemperature(JsonData, weather);
      treatPressure(JsonData, weather);
      treatWind(JsonData, weather);
      treatSun(JsonData, weather);
      res.json(JsonData);
    });
  });
});
module.exports = app => app.use('/', router);