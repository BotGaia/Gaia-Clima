function getHoursAhead(hours, day, month, year) {
  const today = new Date();
  today.setHours(today.getHours() - 3);

  const dateAhead = new Date(year, month, day, hours);

  const hoursAhead = (dateAhead.getTime() - today.getTime()) / (60 * 60 * 1000);

  if (hoursAhead > 120 || hoursAhead <= 0) {
    return 'invalid';
  }
  return Math.ceil(hoursAhead);
}

module.exports = {
  getHourlyForecast: (weatherArray, hours, day, month, year) => {
    const hoursAhead = getHoursAhead(hours, day, month, year);

    if (hoursAhead === 'invalid') {
      return 'invalid';
    }

    const n = hoursAhead / 3;
    const forecastNumber = Math.round(n);

    return weatherArray[forecastNumber];
  },
  getHoursAhead,
};
