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
        description: 'Receives a location and returns its weather conditions',
      },
      {
        type: 'GET',
        endpoint: '/forecast',
        parameters: [
          {
            name: 'place',
            type: 'string',
          },
        ],
        description: 'Receives a location and returns its weather conditions for 5 days in the future',
      },
      {
        type: 'GET',
        endpoint: '/climateForecast',
        parameters: [
          {
            name: 'place',
            type: 'string',
          },
          {
            name: 'day',
            type: 'integer',
          },
          {
            name: 'month',
            type: 'integer',
          },
          {
            name: 'year',
            type: 'integer',
          },
          {
            name: 'hours',
            type: 'integer',
          },
        ],
        description: 'Receives a location and a date and returns the weather conditions for that date and place',
      },
      {
        type: 'POST',
        endpoint: '/sportForecast',
        JSON: {
          telegramId: 'string',
          day: 'integer',
          hours: 'integer',
          year: 'integer',
          month: 'integer',
          sport: 'string',
          locals: 'array',
        },
        description: 'Receives a notification object and a date and returns the favorability of the sport and a weather object for each location.',
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
