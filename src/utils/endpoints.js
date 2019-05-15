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
        description: 'Receives a location and return its weather conditions',
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
        description: 'Receives a location and returns favorable sports, sports with reservation and sports with alert for the given location',
      },
      {
        type: 'GET',
        endpoint: '/allSports',
        parameters: [],
        description: 'Returns all the sports in the database',
      },
    ];

    return endpoints;
  },
};
