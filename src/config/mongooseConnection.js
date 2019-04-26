const mongoose = require('mongoose');
const dbAction = require('../db/dbActions');

module.exports = {
  connect: () => {
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
    }).catch();
  },

  saveSports: () => {
    dbAction.saveAllSports();
  },
};
