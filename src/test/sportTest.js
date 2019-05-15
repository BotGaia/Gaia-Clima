/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const Sport = require('../models/Sport');
const Interval = require('../models/Interval');
const compare = require('../utils/compareSportWithWeather');
const mongooseConnection = require('../db/config/mongooseConnection');

const should = chai.should();

describe('Validate database', () => {
  it('should have sports saved', (done) => {
    new Sport('sportTest2').findMe().then((isFound) => {
      isFound.should.be.equal(true);
      done();
    });
  });
});

describe('Create Sport', () => {
  it('Should create a sport named sport with temperature.limitArray of lenght 1', () => {
    mongooseConnection.connect().then(() => {
      const sport = new Sport('sport');
      const interval = new Interval('1', '1');
      sport.appendTemperatureLimitAray(interval);
      sport.getSport().temperature.limitArray.length.should.be.equal(1);
    });
  });
});
