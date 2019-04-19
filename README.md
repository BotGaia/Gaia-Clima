[![pipeline status](https://gitlab.com/botgaia/Gaia-Clima/badges/master/pipeline.svg)](https://gitlab.com/botgaia/Gaia-Clima/commits/master)
[![coverage report](https://gitlab.com/botgaia/Gaia-Clima/badges/master/coverage.svg)](https://gitlab.com/botgaia/Gaia-Clima/commits/master)

# Wendy-Clima

## Objetivo
Esse serviço é responsável por pegar o clima de um determinado local, referenciado pela longitude e latitude, da API [OpenWeatherMap](https://openweathermap.org).

## Como usar

### Como rodar
Primeiro tem que instalar o docker, em seguida rode o projeto como desenvolvimento da seguinte maneira:

```$ sudo docker build --rm -t gaiaclima . --build-arg IP_ADDRESS="$(chmod 755 ip-get ; ./ip-get)"```

Após o build, rode esse outro comando:

```$ sudo docker run --env-file ./app-env --rm -it -p 3000:3000 -v $PWD:/app -v /app/node_modules wendyclima```

Para rodar os testes, rode esse comando:

```$ sudo docker run --env-file ./app-env --rm -it -p 3000:3000 -v $PWD:/app -v /app/node_modules wendyclima /bin/sh -c "cd /app; npm test"```

Para rodar a folha de estilo, utilize este comando:

```$ sudo docker run --rm -it -p 3000:3000 -v $PWD:/app -v /app/node_modules wendyclima /bin/sh -c "cd /app; npm run lint"```

### Endpoints
<table>
	<tr>
		<td>GET</td>
		<td>localhost:3000/request?lati={VALOR}&long={VALOR}</td>
		<td>lati</td>
		<td>float</td>
		<td>long</td>
		<td>float</td>
		<td>Recebe informação a respeito do clima nas coordenadas informadas</td>
	</tr>
</table>