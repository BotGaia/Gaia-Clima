function getHoursAhead(hours, day, month, year) {
  const date = new Date();
  date.setHours(date.getHours() - 3);

  let hoursAhead = 0;
  let fullDays;

  if (date.getFullYear() === year) {
    if (date.getMonth() === month) {
      if (date.getDate() <= day) {
        hoursAhead += (day - date.getDate()) * 24;

        if (date.getDate() === day) {
          if (date.getHours() < hours) {
            hoursAhead += hours;
          } else {
            hoursAhead = 'invalid';
          }
        } else {
          hoursAhead += 24 - date.getHours() + hours;
        }
      } else {
        hoursAhead = 'invalid';
      }
    } else if (date.getMonth() < month) {
      if (date.getDate() > day) {
        const thisMonth = date.getMonth();
        if (
          thisMonth === 0
          || thisMonth === 2
          || thisMonth === 4
          || thisMonth === 6
          || thisMonth === 7
          || thisMonth === 9
          || thisMonth === 11
        ) {
          fullDays = 31;
        } else if (thisMonth === 1) {
          fullDays = 28;
        } else {
          fullDays = 30;
        }
        hoursAhead += (fullDays - date.getDate() + day) * 24;
      } else {
        hoursAhead = 'invalid';
      }
    } else {
      hoursAhead = 'invalid';
    }
  } else if (date.getFullYear() < year) {
    if (month === 0 && date.getMonth() === 11) {
      hoursAhead += (31 - date.getDate() + day) * 24;
    } else {
      hoursAhead = 'invalid';
    }
  } else {
    hoursAhead = 'invalid';
  }

  if (hoursAhead > (24 * 5)) {
    hoursAhead = 'invalid';
  }
  return hoursAhead;
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
