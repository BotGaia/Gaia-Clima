const Sport = require("../models/Sport");
const Interval = require("../models/Interval");
const mongooseConnection = require("../config/mongooseConnection");

module.exports = {

  saveAllSports() {
    this.saveLol();
  },
  
  saveLol() {
    const sport = new Sport("loeel");
    const temperatureInterval = new Interval("3000", "-3000");
    const humidityInterval = new Interval("3000", "-3000");
    const windSpeedInterval = new Interval("3000", "-3000");
    sport.appendTemperatureLimitAray(temperatureInterval);
    sport.appendHumidityLimitAray(humidityInterval);
    sport.appendwindSpeedLimitAray(windSpeedInterval);

    sport.findMe().then((isFound) => {
      if(isFound) {
      } else {
        sport.saveSport();
      }
    })
  },

  // saveSport(sportName, temperatureUpperLimit, temperatureLowerLimit, humidityUpperLimit, humidityLowerLimit, windSpeedUpperLimit, windSpeedLowerLimit) {
  //   mongooseConnection.connect();
  //   new Sport(sportName).findMe().then((isFound) => {
  //     if (isFound) {
  //       console.log('This sport already exists.');
  //       process.exit();
  //     } else {
  //       let sport = new Sport(sportName);
  //       sport.buildSport(temperatureUpperLimit, temperatureLowerLimit, humidityUpperLimit, humidityLowerLimit, windSpeedUpperLimit, windSpeedLowerLimit);
  //       sport.saveSport().then(() => {
  //         new Sport(sportName).findMe().then((isFound) => {
  //           if (isFound) {
  //             console.log("sport saved");
  //             process.exit();
  //           } else {
  //             console.log("failed to save sport")
  //             process.exit();
  //           }
  //         });
  //       });
  //     }
  //   });
  // },

  // updateSport(sportName, temperatureUpperLimit, temperatureLowerLimit, humidityUpperLimit, humidityLowerLimit, windSpeedUpperLimit, windSpeedLowerLimit) {
  //   mongooseConnection.connect();
  //   let sport = new Sport(sportName);
  //   sport.findMe().then((isFound) => {
  //     if (isFound) {
  //       sport.buildSport(temperatureUpperLimit, temperatureLowerLimit, humidityUpperLimit, humidityLowerLimit, windSpeedUpperLimit, windSpeedLowerLimit);
  //       sport.saveSport().then(() => {
  //         console.log("sport updated");
  //         process.exit();
  //       });
  //     } else {
  //       console.log("sport not found");
  //       process.exit();
  //     }
  //   });
  // },

  printSport(sportName) {
    mongooseConnection.connect();
    let sport = new Sport(sportName);
    sport.findMe().then((isFound) => {
      if (isFound) {
        console.log(sport);
        process.exit();
      } else {
        console.log("sport not found");
        process.exit();
      }
    });
  },

  deleteSport(sportName) {
    mongooseConnection.connect();
    new Sport(sportName).findMe().then((isFound) => {
      if (isFound) {
        new Sport(sportName).deleteMe().then(() => {
          new Sport(sportName).findMe().then((isFound) => {
            if (isFound) {
              console.log("could not delete");
              process.exit();
            } else {
              console.log("deleted");
              process.exit();
            }
          });
        });
      } else {
        console.log("not found");
        process.exit();
      }
    });
  },
}