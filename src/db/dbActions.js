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
        new Sport(sportName).saveSport().then(() => {
          new Sport(sportName).findMe().then((isFound) => {
            if (isFound) {
              console.log("sport saved");
              process.exit();
            } else {
              console.log("failed to save sport")
              process.exit();
            }
          })
        });

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
            }else{
              console.log("deleted")
              process.exit();
            }
          });
        });
      } else {
        console.log("not found");
        process.exit();
      }
    });
  }
}