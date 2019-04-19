
[![Build Status](https://travis-ci.org/wendybot/Wendy-Clima.svg?branch=dev)](https://travis-ci.org/wendybot/Wendy-Clima)

[![Maintainability](https://api.codeclimate.com/v1/badges/68981c0a1fe08635480b/maintainability)](https://codeclimate.com/github/wendybot/Wendy-Clima/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/68981c0a1fe08635480b/test_coverage)](https://codeclimate.com/github/wendybot/Wendy-Clima/test_coverage)

# Gaia-Clima

## Objetivo
Esse serviço é responsável por pegar o clima de um determinado local, referenciado pela longitude e latitude, da API [OpenWeatherMap](https://openweathermap.org).

## Como usar

### Como rodar
Antes de rodar o projeto é preciso criar um arquivo chamado '.env' na pasta raiz com o seguinte conteúdo:

~~~~
API_KEY={sua chave da API OpenWeatherMap}
IP_ADDRESS={seu endereço IP local}
~~~~

Para conseguir uma chave de API entre no site da [OpenWeatherMap](https://openweathermap.org).

Para descobrir seu endereço IP local em uma máquina Linux ou Mac rode este comando:

```$ ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | grep '192'```

Em uma máquina windows rode:

```$ ipconfig```

E pegue o endereço de IP indicado no campo `Endereço IPv4`.

Primeiro tem que instalar o docker, em seguida rode o projeto como desenvolvimento da seguinte maneira:

```$ sudo docker build --rm -t gaiaclima .```

Após o build, rode esse outro comando:

```$ sudo docker run --env-file ./.env --rm -it -p 3000:3000 -v $PWD:/app -v /app/node_modules gaiaclima```

Para rodar os testes, rode esse comando:

```$ sudo docker run --env-file ./.env --rm -it -p 3000:3000 -v $PWD:/app -v /app/node_modules gaiaclima /bin/sh -c "cd /app; npm test"```

Para rodar a folha de estilo, utilize este comando:

```$ sudo docker run --rm -it -p 3000:3000 -v $PWD:/app -v /app/node_modules gaiaclima /bin/sh -c "cd /app; npm run lint"```

### Endpoints
<table>
	<tr>
		<td>GET</td>
		<td>localhost:3000/request?place={VALOR}</td>
		<td>place</td>
		<td>string</td>
		<td>Recebe informação a respeito do clima no local informado</td>
	</tr>
</table>