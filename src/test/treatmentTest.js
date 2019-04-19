/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');

const should = chai.should();
const Treatment = require('../models/treatmentWeather.js');

describe('setName', () => {
  it('set nome', () => {
    const weather = new Weather();
    weather.setName('');
  });
});
