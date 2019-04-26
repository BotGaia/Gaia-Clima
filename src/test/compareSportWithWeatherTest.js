/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');

const should = chai.should();
const treatment = require('../utils/treatmentWeather.js');
const compare = require('../utils/compareSportWithWeather');

const Sport = require('../models/Sport');

let sport = new Sport('sport');

const fakeWeather = {temperature: 2.0, humidity: 2.0, windyspeed: 2.0};

describe('Compare something', () => {
    it('should be equal or not', (done) => {
        console.log(sport.temperature+'-------------------------------------')
        const tof = compare.compareTemperature(sport, fakeWeather);
        tof.should.be.true;
    });
})