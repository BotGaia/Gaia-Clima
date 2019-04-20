/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');

const should = chai.should();
const treatment = require('../models/treatmentWeather.js');
const Request = require('../requests/requestWeather');
const Weather = require('../models/Weather');

describe('getName', () => {
  it('get Name', (done) => {
    Request.getWeather('60.0272', '-169.7109').then((value) => {
      const weather = new Weather();
      treatment.treat(value, weather);
      const name = weather.getName();
      should.equal(name, '');
      done();
    });
  }).timeout(5000);
});
