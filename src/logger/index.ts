import winston, { LoggerInstance, transports } from 'winston';

function getLogger(): LoggerInstance {
  return new winston.Logger({
    level: 'info',
    transports: [
      new transports.Console()
    ]
  });
}

export default getLogger;
