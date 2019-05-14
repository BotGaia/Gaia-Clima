[![pipeline status](https://gitlab.com/botgaia/Gaia-Clima/badges/master/pipeline.svg)](https://gitlab.com/botgaia/Gaia-Clima/commits/master)
[![coverage report](https://gitlab.com/botgaia/Gaia-Clima/badges/master/coverage.svg)](https://gitlab.com/botgaia/Gaia-Clima/commits/master)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

# Gaia-Clima

## Objetivo

Esse serviço é responsável por pegar o clima de um determinado local, referenciado pela longitude e latitude, da API [OpenWeatherMap](https://openweathermap.org).

## Como contribuir

Se tiver interesse em como contribuir para o projeto, olhe nossa [wiki](https://github.com/fga-eps-mds/2019.1-Gaia).

## Como usar

### Configuração do ambiente

Antes de rodar o projeto é preciso criar um arquivo chamado `.env` na pasta raiz com o seguinte conteúdo:

~~~~
API_KEY={Sua chave da API OpenWeatherMap}
IP_ADDRESS={Seu endereço IP local}
~~~~

Para conseguir uma chave de API entre no site da [OpenWeatherMap](https://openweathermap.org).

Para descobrir seu endereço IP local em uma máquina Linux ou Mac rode este comando:

```$ ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | grep '192'```

Em uma máquina windows rode:

```$ ipconfig```

E pegue o endereço de IP indicado no campo `Endereço IPv4`.

### Rodar localmente

O nosso projeto utiliza o Docker e o Docker Compose como ferramentas de desenvolvimento. Para instalar eles, siga o tutorial no site oficial do [Docker](https://www.docker.com/).

Após instalar o docker rode o projeto como desenvolvimento da seguinte maneira:

```$ sudo docker-compose up --build```

Para rodar os testes, rode esse comando:

``` $ sudo docker-compose run gaiaclima npm run test ```

Para rodar a folha de estilo, utilize este comando:

``` $ sudo docker-compose run gaiaclima npm run lint ```

### Endpoints

Aqui se encontra todos os endpoints desse serviço. Todos os endpoints se encontra em `localhost:3000`.

|Requisição|Endpoint|Parâmetro:Tipo|Descrição|
|:--------:|:------:|:------------:|:-------:|
|GET|/|-|Retorna todas as endpoints do microserviço.|
|GET|/climate|place: String|Recebe um local e retorna as condições climáticas do mesmo.|
|GET|/forecast|place: String|Recebe um local e retorna quarenta previsões das condições climáticas do mesmo do período de cinco dias.|
|GET|/sports|place: String|Recebe um local e retorna os esportes favoraveis, com ressalva e com alerta.|
|GET|/allSports|-|Recebe todos os esportes presentes no banco de dados.|
