[![Build Status](https://travis-ci.org/wendybot/Wendy-Clima.svg?branch=dev)](https://travis-ci.org/wendybot/Wendy-Clima)

[![Maintainability](https://api.codeclimate.com/v1/badges/68981c0a1fe08635480b/maintainability)](https://codeclimate.com/github/wendybot/Wendy-Clima/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/68981c0a1fe08635480b/test_coverage)](https://codeclimate.com/github/wendybot/Wendy-Clima/test_coverage)

# Wendy-Clima

## Objetivo
Esse serviço é responsável por pegar o clima de um determinado local, referenciado pela longitude e latitude, da API [OpenWeatherMap](https://openweathermap.org).

## Como usar

### Como rodar
Primeiro tem que instalar o docker, em seguida rode o projeto como desenvolvimento da seguinte maneira:

```$ docker build --rm -t wendyclima .```

Após o build, rode esse outro comando:

```$ docker run --rm -it -p 3000:3000 -v $PWD:/app -v /app/node_modules wendyclima```

Para rodar os testes, rode esse comando:

```$ docker run --rm -it -p 3000:3000 -v $PWD:/app -v /app/node_modules wendyclima /bin/sh -c "cd /app; npm test"```

Para rodar a folha de estilo, utilize este comando:

```$ docker run --rm -it -p 3000:3000 -v $PWD:/app -v /app/node_modules wendyclima /bin/sh -c "cd /app; npm run lint"```

### Endpoints

Aqui se encontra todas as endpoints desse serviço.
