/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const hourly = require('../utils/hourlyForecast');

describe('Hourly Forecast', () => {
  it('Should return 1st item', () => {
    const date = new Date(Date.now());

    date.setHours(date.getHours() - 3);

    hourly.getHourlyForecast(
      [1, 2, 3, 4, 5, 6, 7],
      date.getHours() + 1,
      date.getDate(),
      date.getMonth(),
      date.getFullYear(),
    )
      .should
      .eql(1);
  });

  it('Should rerutn 3 hours', () => {
    const date = new Date();

    hourly.getHoursAhead(
      date.getHours(),
      date.getDate(),
      date.getMonth(),
      date.getFullYear(),
    )
      .should
      .eql(3);
  });


  it('Should rerutn invalid 1', () => {
    const date = new Date();
    date.setHours(date.getHours() - 3);

    hourly.getHoursAhead(
      date.getHours() + 3,
      date.getDate(),
      date.getMonth(),
      date.getFullYear() + 1,
    )
      .should
      .eql('invalid');
  });

  it('Should rerutn invalid 2', () => {
    const date = new Date();
    date.setHours(date.getHours() - 3);

    hourly.getHoursAhead(
      date.getHours(),
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear(),
    )
      .should
      .eql('invalid');
  });

  it('Should rerutn invalid 3', () => {
    const date = new Date();
    date.setHours(date.getHours() - 3);

    hourly.getHoursAhead(
      date.getHours(),
      date.getDate() + 6,
      date.getMonth(),
      date.getFullYear(),
    )
      .should
      .eql('invalid');
  });

  it('Should rerutn invalid 4', () => {
    const date = new Date();
    date.setHours(date.getHours() + 121);

    hourly.getHoursAhead(
      date.getHours(),
      date.getDate(),
      date.getMonth(),
      date.getFullYear(),
    )
      .should
      .eql('invalid');
  });

  it('Should rerutn invalid 5', () => {
    const date = new Date();
    date.setHours(date.getHours() - 3);

    hourly.getHoursAhead(
      date.getHours() - 10,
      date.getDate(),
      date.getMonth(),
      date.getFullYear(),
    )
      .should
      .eql('invalid');
  });

  it('Should rerutn invalid 6', () => {
    const date = new Date();
    date.setHours(date.getHours() - 3);

    hourly.getHoursAhead(
      date.getHours(),
      date.getDate(),
      date.getMonth() - 1,
      date.getFullYear(),
    )
      .should
      .eql('invalid');
  });

  it('Should rerutn invalid 7', () => {
    const date = new Date();
    date.setHours(date.getHours() - 3);

    hourly.getHoursAhead(
      date.getHours(),
      date.getDate(),
      date.getMonth(),
      date.getFullYear() - 1,
    )
      .should
      .eql('invalid');
  });

  it('Should rerutn invalid 8', () => {
    const date = new Date();
    date.setHours(date.getHours() - 3);

    hourly.getHoursAhead(
      date.getHours(),
      date.getDate() - 1,
      date.getMonth(),
      date.getFullYear(),
    )
      .should
      .eql('invalid');
  });

  it('Should rerutn invalid 9', () => {
    const date = new Date();
    date.setHours(date.getHours() - 3);

    hourly.getHoursAhead(
      date.getHours() - 4,
      date.getDate(),
      date.getMonth(),
      date.getFullYear(),
    )
      .should
      .eql('invalid');
  });

  it('Should rerutn invalid 10', () => {
    const date = new Date();
    date.setHours(date.getHours() - 3);

    hourly.getHoursAhead(
      date.getHours(),
      date.getDate(),
      13,
      date.getFullYear() + 1,
    )
      .should
      .eql('invalid');
  });
});
