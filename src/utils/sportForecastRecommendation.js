const hourlyForecast = require('./hourlyForecast');
const Sport = require('../models/Sport');
const compare = require('./compareSportWithWeather');

async function getForecastRecommendation(weatherArray, body) {
  let result;
  const weather = hourlyForecast
    .getHourlyForecast(
      weatherArray,
      body.hours,
      body.day,
      body.month,
      body.year,
    );
  const sport = new Sport(body.sport);
  await sport.findMe();

  const recommendation = compare.compareWeather(sport.sport, weather);

  if (recommendation === 3) {
    result = { sportResult: 'favorable', weather };
  } if (recommendation === 2) {
    result = { sportResult: 'reservation', weather };
  } if (recommendation === 1) {
    result = { sportResult: 'alert', weather };
  } if (recommendation === 0) {
    result = { sportResult: 'not', weather };
  }

  return result;
}

module.exports = getForecastRecommendation;
