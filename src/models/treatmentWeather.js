const Weather = require('../models/Weather');

const weather = new Weather();
 
function treatPressure() {  
    const hpa = parseFloat(weather.getPressure());
    const nm = 100 * hpa;
    weather.setPressure(nm.toString());
}

function treatTemperature() {
    const kel = parseFloat(weather.getTemperature());
    const kelMax = parseFloat(weather.getTemperatureMax());
    const kelMin = parseFloat(weather.getTemperatureMin());

    const celsius = kel - 273.15;
    const celsiusMax = kelMax - 273.15;
    const celsiusMin = kelMin - 273.15;

    weather.setTemperature(celsius.toString());
    weather.setTemperatureMax(celsiusMax.toString());
    weather.setTemperatureMin(celsiusMin.toString());
}

function treatSky() {
    if (weather.getSky() === 'clear sky') {
      weather.setSky('céu limpo');
    }
    if (weather.getSky() === 'few clouds') {
      weather.setSky('poucas nuvens');
      }
      if (weather.getSky() === 'broken clouds') {
        weather.setSky('céu parcialmente nublado');
      }
      if (weather.getSky() === 'scattered clouds') {
        weather.setSky('nuvens dispersas');
      }
      if (weather.getSky() === 'moderate rain') {
        weather.setSky('chuva moderada');
      }
      if (weather.getSky() === 'light rain') {
        weather.setSky('leve chuva');
      }
      if (weather.getSky() === 'overcast clouds') {
        weather.setSky('céu nublado');
      }
      if (weather.getSky() === 'light intensity') {
        weather.setSky('sol forte');
      }
      if (weather.getSky() === 'shower rain') {
        weather.setSky('chuva intensa');
      }
      if (weather.getSky() === 'heavy snow') {
        weather.setSky('neve intensa');
      }
    }
function treatWindy() {
    const ang = parseFloat(weather.getWindyDegrees());
    if (ang >= 337.5 && ang < 22.5){
      weather.setWindyDegrees('leste');
    }
    if (ang >= 22.5 && ang < 67.5) {
      weather.setWindyDegrees('nordeste');
    }
    if (ang >= 67.5 && ang < 112.5) {
      weather.setWindyDegrees('norte');
    }
    if (ang >= 112.5 && ang < 157.5) {
      weather.setWindyDegrees('noroeste');
    }
    if (ang >= 157.5 && ang < 202.5) {
      weather.setWindyDegrees('oeste');
    }
    if (ang >= 202.5 && ang < 247.5) {
      weather.setWindyDegrees('sudoeste');
    }
    if (ang >= 247.5 && ang < 292.5) {
      weather.setWindyDegrees('sul');
    }
    if (ang >= 292.5 && ang < 337.5) {
      weather.setWindyDegrees('sudeste');
    }
}  

function treatSun() {
    const sunr = parseInt(weather.getSunrise());
    const suns = parseInt(weather.getSunset());

    const sr = new Date(sunr).toLocaleTimeString("pt-BR");
    const ss = new Date(suns).toLocaleTimeString("pt-BR");
    weather.setSunset(ss.toString());
    weather.setSunrise(sr.toString());
}
module.exports.treatPressure = treatPressure;
module.exports.treatTemperature = treatTemperature;
module.exports.treatSky = treatSky;
module.exports.treatWindy = treatWindy;
module.exports.treatSun = treatSun;