/* eslint-disable import/no-unresolved */
const express = require('express');
const bodyParser = require('body-parser');
const mongooseConnection = require('./config/mongooseConnection');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongooseConnection.connect();
mongooseConnection.saveSports();

require('./routes')(app);

app.get('/', (req, res) => {
  res.json({ Hello: 'World' });
});

app.listen(3000);

module.exports = app;
