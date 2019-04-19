const https = require('https');
const http = require('http');

const apiKey = process.env.API_KEY;
const targetIp = process.env.IP_ADDRESS;

module.exports = {
	getLocal: (target) => {
		let localData = '';
		let localJsonData = '';
		
		return new Promise((resolve) => {
			http.get(`http://${targetIp}:3001/local?address=${target}`, (resp) => {
				resp.on('data', (chunk) => {
					localData += chunk;
				});
				
				resp.on('end', () => {
					localJsonData = JSON.parse(localData);
					resolve(localJsonData);
				});
			});
		});
	},
	
	getWeather: (localJson) => {
		const { lat } = localJson;
		const { lng } = localJson;
		let weatherData = '';
		let weatherJsonData = '';
		
		return new Promise((resolve) => {
			https.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`, (resp) => {
				resp.on('data', (chunk) => {
					weatherData += chunk;
				});
				
				resp.on('end', () => {
					weatherJsonData = JSON.parse(weatherData);
					resolve(weatherJsonData);
				});
			});
		});
	},
};

