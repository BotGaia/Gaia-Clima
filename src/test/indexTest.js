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
    chai.request(app).get('/request/?lati=22&long=25').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('Object');
      done();
    });
  });
});
