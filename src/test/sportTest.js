/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const Sport = require('../models/Sport');
const Interval = require('../models/Interval');
const compare = require('../utils/compareSportWithWeather');

const should = chai.should();

describe('Validate database', () => {
  it('shoud have sports saved', (done) => {
    new Sport('loeel').findMe().then((isFound) => {
      isFound.should.be.equal(true);
      done();
    });
  });
});

describe('Test Sport class', () => {
  it('Should create a sport named sport with temperature.limitArray of lenght 1', () => {
    const sport = new Sport('sport');
    const interval = new Interval('1', '1');
    sport.appendTemperatureLimitAray(interval);
    sport.getSport().temperature.limitArray.length.should.be.equal(1);
  });
});

describe('Compare sport with weather', () => {
  it('should return true', () => {
    const sport = new Sport('sport');
    const interval = new Interval('3', '1');
    sport.appendTemperatureLimitAray(interval);
    const fakeWeather = { temperature: 2 };
    compare.compareTemperature(sport.getSport(), fakeWeather).should.be.equal(true);
  });
});
