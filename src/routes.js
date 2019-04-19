const express = require('express');

const requestWeather = require('./requests/requestWeather');

const router = express.Router();

router.get('/request', (req, res) => {
	requestWeather.getLocal(req.query.place).then((coordsJson) => {
		requestWeather.getWeather(coordsJson).then((weatherJson) => {
			res.json(weatherJson);
		});
	});
});
module.exports = app => app.use('/', router);
