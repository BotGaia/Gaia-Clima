/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');

const should = chai.should();
const treatment = require('../utils/treatmentWeather.js');
// const Request = require('../requests/requestWeather');
// const Weather = require('../models/Weather');

describe('get Temperature', () => {
  it('get Temperature', (done) => {
      const a = treatment.treatTemperature('332.98');
      a.should.equal('59.83');
      done();
    });
  }).timeout(5000);

