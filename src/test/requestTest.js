/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

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

describe('Wrong parameters', () => {
  it('should return a 400 error', (done) => {
    chai.request(app).get('/request?lat=22&lon=RUSBÉ').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      res.body.should.have.property('name').eql('error');
      done();
    });
  }).timeout(5000);
});
describe('Missing parameters', () => {
  it('should return a 400 error', (done) => {
    chai.request(app).get('/request?lat=22').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      res.body.should.have.property('sky').eql('error');
      done();
    });
  }).timeout(5000);
});

describe('Unexisting coordinates', () => {
  it('should return a 400 error', (done) => {
    chai.request(app).get('/request?lat=-92&lon=182').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      res.body.should.have.property('temperature').eql('error');
      done();
    });
  }).timeout(5000);
});
