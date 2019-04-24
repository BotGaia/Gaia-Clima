const Sport = require("../models/Sport")
const mongooseConnection = require("../config/mongooseConnection")

module.exports = {

  saveSport(sportName) {
    mongooseConnection.connect();
    new Sport(sportName).findMe().then((isFound) => {
      if (isFound) {
        console.log('This sport already exists.');
        process.exit();
      } else {
        new Sport(sportName).saveSport();
        if (new Sport(sportName).findMe()) {
          console.log('Sport saved.');
          process.exit();
        } else {
          console.log('Failed to save sport');
          process.exit();
        }
      }
    });
  },
}