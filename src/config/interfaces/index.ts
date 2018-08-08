interface CacheConfig {
  stdTTL: number;
  checkperiod: number;
}

interface DatabaseConfig {
  url: string;
}

interface ShowsConfig {
  itemsOnPage: number;
}

interface ServicesConfig {
  cache: CacheConfig;
  database: DatabaseConfig;
  shows: ShowsConfig;
}

interface ScrapperConfig {
  url: string;
  queryLimit: number;
  delay: number;
  delayOnError: number;
  firstPageOnly: boolean;
  attemptsOnLimitError: number;
}

interface Config {
  port: number | string;
  services: ServicesConfig;
  scrapper: ScrapperConfig;
}

export {
  Config,
  CacheConfig,
  DatabaseConfig,
  ShowsConfig,
  ServicesConfig,
  ScrapperConfig
};
