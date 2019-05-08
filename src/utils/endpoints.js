module.exports = {
  getJson: () => {
    const endpoints = [
      {
        type: 'GET',
        endpoint: '/climate',
        parameters: [
          {
            name: 'place',
            type: 'string',
          },
        ],
        description: 'Recebe um local e retorna as condições climáticas do mesmo',
      },
      {
        type: 'GET',
        endpoint: '/sports',
        parameters: [
          {
            name: 'place',
            type: 'string',
          },
        ],
        description: 'Recebe um local e retorna os esportes favoráveis, com ressalva e com alerta',
      },
      {
        type: 'GET',
        endpoint: '/allSports',
        parameters: [],
        description: 'Retorna todos os esportes presentes no banco de dados',
      },
    ];

    return endpoints;
  },
};
