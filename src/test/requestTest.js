/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const should = chai.should();

chai.use(chaiHttp);

describe('GET weather', () => {
  it('should get a weather object', () => {
    chai.request(app).get('/request?place=brasilia').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
    });
  });
});

describe('Wrong parameters', () => {
  it('should return a 400 error', () => {
    chai.request(app).get('/request?ze=RUSBÉ').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      res.body.should.have.property('cod').eql('400');
    });
  });
});
describe('Missing parameters', () => {
  it('should return a 400 error', () => {
    chai.request(app).get('/request?').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      res.body.should.have.property('cod').eql('400');
    });
  });
});

describe('Invalid character', () => {
  it('should return a 400 error', () => {
    chai.request(app).get('/request?place=bra silia').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      res.body.should.have.property('cod').eql('400');
    });
  });
});
