/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');

const should = chai.should();
const treatment = require('../utils/treatmentWeather.js');
const compare = require('../utils/compareSportWithWeather');

const Sport = require('../models/Sport');
const Interval = require('../models/Interval');


const fakeWeather = { temperature: -20000, humidity: -20000, windyspeed: -20000 };

describe('Compare something', () => {
  it('should be equal or not', () => {
    const sport = new Sport('sportTest');
    const interval = new Interval('-10000', '-30000');
    sport.appendTemperatureLimitAray(interval);
    const tof = compare.compareTemperature(sport.getSport(), fakeWeather);
    tof.should.be.equal(true);
  });
});
