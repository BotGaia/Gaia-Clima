const mongoose = require('mongoose');
const dbAction = require('../db/dbActions');

module.exports = {
  connect: () => new Promise((resolve) => {
    mongoose.Promise = global.Promise;
    const options = {
      keepAlive: true,
      socketTimeoutMS: 540000,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      autoIndex: false,
      reconnectInterval: 500,
      poolSize: 10,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
    };

    mongoose.connect('mongodb://mongo:27018/gaiaclima', options).then(() => {
      dbAction.saveAllSports().then(() => {
        resolve();
      });
    }).catch();
  }),

};
