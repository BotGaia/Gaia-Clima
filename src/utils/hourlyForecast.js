function getHoursAhead(hours, day, month, year) {

    const date = new Date();
    date.setHours(date.getHours() - 3);

    let hoursAhead = 0;

    if (date.getFullYear() == year) {
        if (date.getMonth() == month) {
            if (date.getDay() <= day) {
                hoursAhead += (day - date.getDay()) * 24;

                if (date.getDay() == day) {
                    if (date.getHours() < hours) {
                        hoursAhead += hours;
                    } else {
                        hoursAhead = 'invalid'
                    }
                } else {
                    hoursAhead += 24 - date.getHours() + hours;
                }
            } else {
                hoursAhead = 'invalid'
            }
        } else if (date.getMonth() < month) {
            if (date.getDay() > day) {
                const thisMonth = date.getMonth()
                if (thisMonth == 0 || thisMonth == 2 || thisMonth == 4 || thisMonth == 6 || thisMonth == 7 || thisMonth == 9 || thisMonth == 11) {
                    fullDays = 31;
                } else if (thisMonth == 1) {
                    fullDays = 28;
                } else {
                    fullDays = 30;
                }
                hoursAhead += (fullDays - date.getDay() + day) * 24;
            } else {
                hoursAhead = 'invalid'
            }

        } else {
            hoursAhead = 'invalid'
        }
    } else if (date.getFullYear() < year) {
        if (month = 0 && date.getMonth() == 11) {
            hoursAhead += (31 - date.getDay() + day) * 24;
        }
    }

    if (hoursAhead > (24 * 5)) {
        hoursAhead = 'invalid'
    }
    return hoursAhead;
}

module.exports = {
    getHourlyForecast: (weatherArray, hours, day, month, year) => {

        

        let hoursAhead = getHoursAhead(hours, day, month, year);

        if (hoursAhead == 'invalid') {
            //invalidshit
        }

        const forecastNumber = Math.round(hoursAhead / 3);

        return weatherArray[forecastNumber];

    },


}