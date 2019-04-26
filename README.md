
[![pipeline status](https://gitlab.com/botgaia/Gaia-Clima/badges/master/pipeline.svg)](https://gitlab.com/botgaia/Gaia-Clima/commits/master)
[![coverage report](https://gitlab.com/botgaia/Gaia-Clima/badges/master/coverage.svg)](https://gitlab.com/botgaia/Gaia-Clima/commits/master)


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

```$ sudo docker-compose up --build```

Para rodar os testes, rode esse comando:

``` $ sudo docker-compose run gaiaclima /bin/sh -c "cd /app; npm i; npm run test" ```

Para rodar a folha de estilo, utilize este comando:

``` $ sudo docker-compose run gaiaclima /bin/sh -c "cd /app; npm i; npm run lint" ```


### Endpoints
<table>
	<tr>
		<td>GET</td>
		<td>localhost:3000/climate?place={VALOR}</td>
		<td>place</td>
		<td>string</td>
		<td>Recebe informação a respeito do clima no local informado</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>localhost:3000/sports?place={VALOR}</td>
		<td>place</td>
		<td>string</td>
		<td>Recebe esportes recomendados favoraveis, com ressalva e com alerta</td>
	</tr>
	<tr>
		<td>GET</td>
		<td>localhost:3000/allSports</td>
		<td>-</td>
		<td>-</td>
		<td>Recebe todos os esportes presentes no banco de dados</td>
	</tr>
</table>
