module.exports = class Weather {
  constructor(name){
    this.name = name;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setSky(sky) {
    this.sky = sky;
  }

  getSky() {
    return this.sky;
  }

  setTemperature(temperature) {
    this.temperature = temperature;
  }

  getTemperature() {
    return this.temperature;
  }

  setPressure(pressure) {
    this.pressure = pressure;
  }

  getPressure() {
    return this.pressure;
  }

  setHumidity(humidity) {
    this.humidity = humidity;
  }

  getHumidity() {
    return this.humidity;
  }

  setTemperatureMin(temperatureMin) {
    this.temperatureMin = temperatureMin;
  }

  getTemperatureMin() {
    return this.temperatureMin;
  }

  setTemperatureMax(temperatureMax) {
    this.temperatureMax = temperatureMax;
  }

  getTemperatureMax() {
    return this.temperatureMax;
  }

  setSeaLevel(seaLevel) {
    this.seaLevel = seaLevel;
  }

  getSeaLevel() {
    return this.seaLevel;
  }

  setWindySpeed(windySpeed) {
    this.windySpeed = windySpeed;
  }

  getWindySpeed() {
    return this.windySpeed;
  }

  setWindyDegrees(windyDegrees) {
    this.windyDegrees = windyDegrees;
  }

  getWindyDegrees() {
    return this.windyDegrees;
  }

  setSunrise(sunrise) {
    this.sunrise = sunrise;
  }

  getSunrise() {
    return this.sunrise;
  }

  setSunset(sunset) {
    this.sunset = sunset;
  }

  getSunset() {
    return this.sunset;
  }
}
