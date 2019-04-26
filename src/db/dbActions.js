const Sport = require('../models/Sport');
const Interval = require('../models/Interval');
const mongooseConnection = require('../config/mongooseConnection');

module.exports = {

  saveAllSports() {
    this.saveLol();
  },

  saveLol() {
    const sport = new Sport('loeel');
    const temperatureInterval = new Interval('3000', '-3000');
    const humidityInterval = new Interval('3000', '-3000');
    const windSpeedInterval = new Interval('3000', '-3000');
    sport.appendTemperatureLimitAray(temperatureInterval);
    sport.appendHumidityLimitAray(humidityInterval);
    sport.appendwindSpeedLimitAray(windSpeedInterval);

    sport.findMe().then((isFound) => {
      if (!isFound) {
        sport.saveSport();
      }
    });
  },

  printSport(sportName) {
    mongooseConnection.connect();
    const sport = new Sport(sportName);
    sport.findMe().then((isFound) => {
      if (isFound) {
        process.exit();
      } else {
        process.exit();
      }
    });
  },

  deleteSport(sportName) {
    mongooseConnection.connect();
    new Sport(sportName).findMe().then((isFound) => {
      if (isFound) {
        new Sport(sportName).deleteMe().then(() => {
          new Sport(sportName).findMe().then((isFound2) => {
            if (isFound2) {
              process.exit();
            } else {
              process.exit();
            }
          });
        });
      } else {
        process.exit();
      }
    });
  },
};
