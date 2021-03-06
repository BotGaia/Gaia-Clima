/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const requestWeather = require('../requests/requestWeather');
const Weather = require('../models/Weather');

const should = chai.should();
chai.use(chaiHttp);

describe('GET WEATHER', () => {
  it('should get a weather object', (done) => {
    const getLocalResponse = JSON.parse('{"lat":"-10.3333333","lng":"-53.2"}');

    requestWeather.getWeather(getLocalResponse).then((weatherJson) => {
      weatherJson.should.be.a('Object');
      weatherJson.should.have.property('cod').eql(200);
      done();
    });
  }).timeout(5000);

  it('should return a 400 error', (done) => {
    const getLocalResponse = JSON.parse('{}');

    requestWeather.getWeather(getLocalResponse).then((weatherJson) => {
      weatherJson.should.be.a('Object');
      weatherJson.should.have.property('cod').eql('400');
      done();
    });
  }).timeout(5000);

  it('should return a 400 error', (done) => {
    const getLocalResponse = JSON.parse('{"lat":"error","lng":"error"}');

    requestWeather.getWeather(getLocalResponse).then((weatherJson) => {
      weatherJson.should.be.a('Object');
      weatherJson.should.have.property('cod').eql('400');
      done();
    });
  }).timeout(5000);

  it('should have name, sunrise and sunset', (done) => {
    const getLocalResponse = {
      lat: '-10.1399415',
      lng: '-76.2775463',
    };

    requestWeather.getWeather(getLocalResponse).then((weatherJson) => {
      const weather = new Weather(weatherJson, 'weather');

      weather.should.be.a('Object');
      weather.should.have.property('name');
      weather.should.have.property('sunrise');
      weather.should.have.property('sunset');
    });
    done();
  }).timeout(5000);
});
