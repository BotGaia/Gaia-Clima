async function getForecastRecommendation(weatherArray, body) {
  const weather = hourlyForecast
    .getHourlyForecast(
      weatherArray,
      body.hours,
      body.day,
      body.month,
      body.year,
    );
  const sport = new Sport(req.body.sport);
  await sport.findMe();

  const recommendation = compare.compareWeather(sport.sport, weather);

  if (recommendation === 3) {
    return { sportResult: 'favorable', weather };
  } if (recommendation === 2) {
    return { sportResult: 'reservation', weather };
  } if (recommendation === 1) {
    return { sportResult: 'alert', weather };
  } if (recommendation === 0) {
    return { sportResult: 'not', weather };
  }
}

module.exports = getForecastRecommendation;
