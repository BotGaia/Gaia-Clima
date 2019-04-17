module.exports = class Weather {
    constructor(name,weather,temperature,pressure,humidity,temperatureMin,temperatureMax,seaLevel,windSpeed,windDegress,windDirection,rain,sunrise,sunset){
        this.name = name;
        this.weather = weather;
        this.temperature = temperature;
        this.pressure = pressure;
        this.humidity = humidity;
        this.temperatureMin = temperatureMin;
        this.temperatureMax = temperatureMax;
        this.seaLevel = seaLevel;
        this.windSpeed = windSpeed;
        this.windDegress = windDegress;
        this.windDirection = windDirection;
        this.rain = rain;
        this.sunrise = sunrise;
        this.sunset = sunset;

    }

setName(name) {
    this.name = name;
  }

getName() {
    return this.name;
}

setweather(weather) {
    this.weather = weather;
}

getWeather() {
    return this.weather;
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

getTemperatureMin(temperatureMin) {
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

setWindySpeed() {
    this.windSpeed = windySpeed;
}

getWindySpeed() {
    return this.windySpeed;
}

setWindyDegrees(windyDegrees) {
    this.windyDegrees = windyDegrees;
}

getWindyDegrees() {
    return this.windDegress;
}

setWindyDirection(windDirection) {
    this.windyDirection = windyDirection;
}

getWindyDirection() {
    return this.windyDirection;
}

setRain(rain) {
    this.rain = rain;
}

getRain() {
    return this.rain;
}

setSunrise(sunrise) {
    this.sunrise = sunshine;
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