const treat = require('../utils/treatmentWeather');

module.exports = class Weather {
  constructor(JsonData) {
    this.name = JsonData.name;
    this.sky = treat.treatSky(JsonData.weather[0].description);
    this.temperature = treat.treatTemperature(JsonData.main.temp);
    this.pressure = treat.treatPressure(JsonData.main.pressure);
    this.windyDegrees = treat.treatWind(JsonData.wind.deg);
    this.windySpeed = JsonData.wind.speed.toString();
    this.sunrise = treat.treatSun(JsonData.sys.sunrise);
    this.sunset = treat.treatSun(JsonData.sys.sunset);
    this.temperatureMax = treat.treatTemperature(JsonData.main.temp_max);
    this.temperatureMin = treat.treatTemperature(JsonData.main.temp_min);
    this.humidity = JsonData.main.humidity.toString();
    //this.seaLevel = JsonData.main.seaLevel.toString();
  }
};
