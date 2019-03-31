# Wendy-Clima

## Objetivo
Esse serviço é responsável por pegar o clima de um determinado local, referenciado pela longitude e latitude, da API [OpenWeatherMap](https://openweathermap.org).

## Como usar

### Como rodar
Primeiro tem que instalar o docker, em seguida rode o projeto como desenvolvimento da seguinte maneira:

```$ docker build --rm -t wendyclima .```

Após o build, rode esse outro comando:

```$ docker run --rm -it -p 3000:3000 -v $PWD:/app -v /app/node_modules wendyclima```

### Endpoints

Aqui se encontra todas as endpoints desse serviço.