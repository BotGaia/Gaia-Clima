module.exports = {
  treatSky: (sky) => {
    if (sky === 'clear sky') {
      return ('céu limpo');
    }
    if (sky === 'few clouds') {
      return ('poucas nuvens');
    }
    if (sky === 'broken clouds') {
      return ('céu parcialmente nublado');
    }
    if (sky === 'scattered clouds') {
      return ('nuvens dispersas');
    }
    if (sky === 'moderate rain') {
      return ('chuva moderada');
    }
    if (sky === 'light rain') {
      return ('leve chuva');
    }
    if (sky === 'overcast clouds') {
      return ('céu nublado');
    }
    if (sky === 'light intensity') {
      return ('sol forte');
    }
    if (sky === 'shower rain') {
      return ('chuva intensa');
    }
    if (sky === 'heavy snow') {
      return ('neve intensa');
    }
  },

  treatTemperature: (temp) => {

    const kel = parseFloat(temp);

    const celsius = kel - 273.15;

    return celsius.toFixed(2).toString();
  },

  treatPressure: (pressure) => {
    const hpa = parseFloat(pressure);
    const atm = hpa / 1013.2501;
    return atm.toFixed(2).toString();
  },

  treatWind: (wind) => {
    const ang = parseFloat(wind);
    if (ang >= 337.5 && ang < 22.5) {
      return ('leste');
    }
    if (ang >= 22.5 && ang < 67.5) {
      return ('nordeste');
    }
    if (ang >= 67.5 && ang < 112.5) {
      return ('norte');
    }
    if (ang >= 112.5 && ang < 157.5) {
      return ('noroeste');
    }
    if (ang >= 157.5 && ang < 202.5) {
      return ('oeste');
    }
    if (ang >= 202.5 && ang < 247.5) {
      return ('sudoeste');
    }
    if (ang >= 247.5 && ang < 292.5) {
      return ('sul');
    }
    if (ang >= 292.5 && ang < 337.5) {
      return ('sudeste');
    }
  },

  treatSun: (sun) => {
    const timestamp = parseFloat(sun);
    var date = new Date(timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime.toString();
  },
}