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
  const tooMuchRequestsErrorStatus = 429;

  console.log(error);

  if (error.status === tooMuchRequestsErrorStatus && attemptsOnLimitError) {
    await delay(config.delayOnError);
  } else {
    process.exit(1);
  }
}

async function handleShowsError(error: any) {
  const endPagesErrorStatus = 404;

  console.log(error);

  process.exit(error.status === endPagesErrorStatus ? 0 : 1);
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
    let shows: Show[];

    try {
      shows = await fetcher.getShows(page);
    } catch (error) {
      handleShowsError(error);
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
