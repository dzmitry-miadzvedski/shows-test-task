const config = {
  port: process.env.PORT || 3000,
  services: {
    cache: {
      stdTTL: 30 * 60,
      checkperiod: 5 * 60
    },
    database: {
      url: process.env.DB_CONNECTION || 'mongodb://localhost:27017/shows',
    },
    shows: {
      itemsOnPage: 20
    }
  },
  scrapper: {
    url: 'http://api.tvmaze.com',
    queryLimit: 40,
    delay: 10000,
    delayOnError: 20000,
    firstPageOnly: process.env.NODE_ENV === 'development',
    attemptsOnLimitError: 3
  }
};

export default config;
