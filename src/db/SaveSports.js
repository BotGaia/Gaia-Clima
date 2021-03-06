const Sport = require('../models/Sport');
const Interval = require('../models/Interval');

module.exports = {

  saveAllSports() {
    return new Promise(async (resolve) => {
      await this.saveSportTest();
      await this.saveWindsurf();
      await this.saveKitesurf();
      await this.saveSurf();
      await this.saveStandUpPaddle();
      await this.saveVela();
      resolve();
    });
  },

  saveWindsurf() {
    return new Promise((resolve) => {
      const sport = new Sport('Windsurf');
      let temperatureInterval = new Interval('24', '20');
      sport.appendTemperatureInterval(temperatureInterval);
      temperatureInterval = new Interval('35', '30');
      sport.appendTemperatureInterval(temperatureInterval);
      const humidityInterval = new Interval('70', '21');
      sport.appendHumidityInterval(humidityInterval);
      let windSpeedInterval = new Interval('15.42', '10.794');
      sport.appendwindSpeedInterval(windSpeedInterval);
      windSpeedInterval = new Interval('25.7', '21.074');
      sport.appendwindSpeedInterval(windSpeedInterval);

      sport.findMe().then((isFound) => {
        if (!isFound) {
          sport.saveSport().then(() => { resolve(); });
        } else {
          resolve();
        }
      });
    });
  },

  saveKitesurf() {
    return new Promise((resolve) => {
      const sport = new Sport('Kitesurf');
      const temperatureInterval = new Interval('24', '15');
      const humidityInterval = new Interval('70', '21');
      let windSpeedInterval = new Interval('10.28', '0');
      sport.appendTemperatureInterval(temperatureInterval);
      sport.appendHumidityInterval(humidityInterval);
      sport.appendwindSpeedInterval(windSpeedInterval);
      windSpeedInterval = new Interval('25.7', '15.934');
      sport.appendwindSpeedInterval(windSpeedInterval);

      sport.findMe().then((isFound) => {
        if (!isFound) {
          sport.saveSport().then(() => { resolve(); });
        } else {
          resolve();
        }
      });
    });
  },

  saveSurf() {
    return new Promise((resolve) => {
      const sport = new Sport('Surf');
      const temperatureInterval = new Interval('35', '25');
      const humidityInterval = new Interval('70', '21');
      const windSpeedInterval = new Interval('20.56', '10.794');
      sport.appendTemperatureInterval(temperatureInterval);
      sport.appendHumidityInterval(humidityInterval);
      sport.appendwindSpeedInterval(windSpeedInterval);

      sport.findMe().then((isFound) => {
        if (!isFound) {
          sport.saveSport().then(() => { resolve(); });
        } else {
          resolve();
        }
      });
    });
  },

  saveStandUpPaddle() {
    return new Promise((resolve) => {
      const sport = new Sport('Stand Up Paddle');
      const temperatureInterval = new Interval('29', '20');
      const humidityInterval = new Interval('70', '21');
      const windSpeedInterval = new Interval('20.56', '10.794');
      sport.appendTemperatureInterval(temperatureInterval);
      sport.appendHumidityInterval(humidityInterval);
      sport.appendwindSpeedInterval(windSpeedInterval);

      sport.findMe().then((isFound) => {
        if (!isFound) {
          sport.saveSport().then(() => { resolve(); });
        } else {
          resolve();
        }
      });
    });
  },

  saveVela() {
    return new Promise((resolve) => {
      const sport = new Sport('Vela');
      let temperatureInterval = new Interval('24', '15');
      const humidityInterval = new Interval('70', '40');
      let windSpeedInterval = new Interval('10.28', '0');
      sport.appendTemperatureInterval(temperatureInterval);
      sport.appendHumidityInterval(humidityInterval);
      sport.appendwindSpeedInterval(windSpeedInterval);
      windSpeedInterval = new Interval('25.78', '21.074');
      temperatureInterval = new Interval('35', '30');
      sport.appendTemperatureInterval(temperatureInterval);
      sport.appendwindSpeedInterval(windSpeedInterval);

      sport.findMe().then((isFound) => {
        if (!isFound) {
          sport.saveSport().then(() => { resolve(); });
        } else {
          resolve();
        }
      });
    });
  },

  saveSportTest() {
    return new Promise((resolve) => {
      const sport = new Sport('sportTest2');
      const temperatureInterval = new Interval('3000', '3000');
      const humidityInterval = new Interval('3000', '3000');
      const windSpeedInterval = new Interval('3000', '3000');
      sport.appendTemperatureInterval(temperatureInterval);
      sport.appendHumidityInterval(humidityInterval);
      sport.appendwindSpeedInterval(windSpeedInterval);

      sport.findMe().then((isFound) => {
        if (!isFound) {
          sport.saveSport().then(() => { resolve(); });
        } else {
          resolve();
        }
      });
    });
  },

  printSport(sportName) {
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
