/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const requestWeather = require('../requests/requestWeather');

const should = chai.should();

chai.use(chaiHttp);

describe('GET forecast', () => {
  it('should get a list of weather objects', (done) => {
    const getLocalResponse = JSON.parse('{"lat":"-10.3333333","lng":"-53.2"}');

    requestWeather.getForecast(getLocalResponse).then((forecastJson) => {
      forecastJson.should.be.a('Object');
      forecastJson.should.have.property('cod').eql('200');
      done();
    });
  }).timeout(5000);
});

describe('Invalid or missing parameter', () => {
  it('should return a 400 error', (done) => {
    const getLocalResponse = JSON.parse('{}');

    requestWeather.getForecast(getLocalResponse).then((forecastJson) => {
      forecastJson.should.be.a('Object');
      forecastJson.should.have.property('cod').eql('400');
      done();
    });
  }).timeout(5000);
});

describe('Unexisting location', () => {
  it('should return a 400 error', (done) => {
    const getLocalResponse = JSON.parse('{"lat":"error","lng":"error"}');

    requestWeather.getForecast(getLocalResponse).then((forecastJson) => {
      forecastJson.should.be.a('Object');
      forecastJson.should.have.property('cod').eql('400');
      done();
    });
  }).timeout(5000);
});
