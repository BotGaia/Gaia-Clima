/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');

const should = chai.should();
const treatment = require('../utils/treatmentWeather.js');
const compare = require('../utils/compareSportWithWeather');

const Sport = require('../models/Sport');
const Interval = require('../models/Interval');


const fakeWeather = { temperature: 1500, humidity: 2000, windySpeed: 2000 };

describe('Compare something', () => {

  it('Compare temperature', () => {
    const sport = new Sport('sportTeste');
    const interval = new Interval('3000', '1000');
    sport.appendTemperatureLimitAray(interval);
    const tof = compare.compareTemperature(sport.getSport(), fakeWeather);
    tof.should.be.equal(true);
  });

  it('Compare humidity', () => {
    const sport = new Sport('sportTeste');
    const interval = new Interval('3000', '1000');
    sport.appendHumidityLimitAray(interval);
    const tof = compare.compareHumidity(sport.getSport(), fakeWeather);
    tof.should.be.equal(true);
  });

  it('Compare wind speed', () => {
    const sport = new Sport('sportTeste');
    const interval = new Interval('3000', '1000');
    sport.appendwindSpeedLimitAray(interval);
    const tof = compare.compareWindSpeed(sport.getSport(), fakeWeather);
    tof.should.be.equal(true);
  });

  it('Compare nothing', () => {
    const sport = new Sport('sportTeste');
    const tof = compare.compareWeather(sport.getSport(), fakeWeather);
    tof.should.be.equal(0);
  });
});
