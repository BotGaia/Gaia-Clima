/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const requestWeather = require('../requests/requestWeather');

const should = chai.should();

chai.use(chaiHttp);

describe('GET weather', () => {
  it('should get a weather object', (done) => {
    chai.request(app).get('/request?lat=22&lon=25').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      done();
    });
  }).timeout(5000);
});

describe('Invalid or missing parameter', () => {
  it('should return a 400 error', (done) => {
    chai.request(app).get('/request?lat=22').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      res.body.should.have.property('cod').eql('400');
      done();
    });
  }).timeout(5000);
});

describe('Unexisting location', () => {
  it('should return a 400 error', (done) => {
    chai.request(app).get('/request?lat=-92&lon=182').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      res.body.should.have.property('cod').eql('400');
      done();
    });
  }).timeout(5000);
});
