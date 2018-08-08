import { Show } from '../../models/interfaces';

import globalConfig from '../../config';
import servicesInitializer from '../../services';

import Fetcher from './fetcher';

const config = globalConfig.scrapper;
const isTrue = true;

async function delay(time: number) {
  await new Promise((resolve) => { setTimeout(resolve, time); });
}

async function handleError(error: any, attemptsOnLimitError: number) {
  console.log(error);

  if (error.status === 429 && attemptsOnLimitError) {
    await delay(config.delayOnError);
  } else {
    process.exit(1);
  }
}

async function scrap() {
  const fetcher = new Fetcher(config.url);
  const services = await servicesInitializer(globalConfig);
  let page = 0;

  async function saveShowWithCast(show: Show) {
    show.cast = await fetcher.getCast(show);

    await services.showsService.save(show);
  }

  async function saveShowsWithCast(shows: Show[], groupCount: number) {
    let { attemptsOnLimitError } = config;
    let start = 0;
    let showsGroup;

    while (isTrue) {
      showsGroup = shows.slice(start, start + groupCount);

      if (!showsGroup.length) {
        break;
      }

      try {
        for (const item of showsGroup) {
          await saveShowWithCast(item);
        }

        await delay(config.delay);

        start = start + groupCount;
      } catch (error) {
        await handleError(error, --attemptsOnLimitError);
      }
    }
  }

  while (isTrue) {
    const shows = await fetcher.getShows(page);

    if (!shows.length) {
      break;
    }

    await saveShowsWithCast(shows, config.queryLimit);

    if (config.firstPageOnly) {
      break;
    }

    page++;
  }

  process.exit(0);
}

scrap();
