function treatWeather(JsonData, weather) {
  weather.setName(JsonData.name);
  weather.setHumidity(JsonData.main.humidity);
  weather.setSeaLevel(JsonData.main.sea_level);
}

function treatSky(JsonData, weather) {
  weather.setSky(JsonData.weather[0].description);
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

function treatTemperature(JsonData, weather) {
  weather.setTemperature(JsonData.main.temp);
  weather.setTemperatureMin(JsonData.main.temp_min);
  weather.setTemperatureMax(JsonData.main.temp_max);

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
function treatPressure(JsonData, weather) {
    weather.setPressure(JsonData.main.pressure);
    const hpa = parseFloat(weather.getPressure());
    const nm = 100 * hpa;
    weather.setPressure(nm.toString());
}

function treatWind(JsonData, weather) {
    weather.setWindySpeed(JsonData.wind.speed);
    weather.setWindyDegrees(JsonData.wind.deg);

    const ang = parseFloat(weather.getWindyDegrees());
    if (ang >= 337.5 && ang < 22.5) {
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

function treatSun(JsonData, weather) {
    weather.setSunrise(JsonData.sys.sunrise);
    weather.setSunset(JsonData.sys.sunset);

    const sunr = parseInt(weather.getSunrise());
    const suns = parseInt(weather.getSunset());

    const sr = new Date(sunr).toLocaleTimeString("pt-BR");
    const ss = new Date(suns).toLocaleTimeString("pt-BR");
    weather.setSunset(ss.toString());
    weather.setSunrise(sr.toString());
}
module.exports = {
  treat: (JsonData, weather) => {
    treatSky(JsonData, weather);
    treatPressure(JsonData, weather);
    treatSun(JsonData, weather);
    treatTemperature(JsonData, weather);
    treatWeather(JsonData, weather);
    treatWind(JsonData, weather);
  },
}

