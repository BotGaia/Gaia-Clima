const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const https = require('https');

let data = '';

var lat = 13.0;
var lon = 34.0;

https.get('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=652aee6b1beb9ead3681837980b21671', (resp) => {
  
	resp.on('data', (chunk) => {
		data += chunk;
	});

}).on("error", (err) => {
	console.log("Error: " + err.message);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	var json_data = JSON.parse(data);
 	res.json(json_data);
});

app.listen(3000);
