// Core
import { put, call, delay } from "redux-saga/effects";

// Instruments
import { catsActions } from "@bus/cats/actions";
import { verifyEnvironment } from "@helpers/verifyEnvironment";
import { verifyBrowser } from "@helpers/verifyBrowser";

import { developmentLogger, productionLogger } from "@helpers/logger";
import { handleRestPostRequest } from "@helpers/handleRequest";

export function* loadCats() {
  const { isDevelopment, isProduction } = verifyEnvironment();
  const isBrowser = verifyBrowser();

  const url = "https://cat-fact.herokuapp.com/facts";
  let status = null;

  try {
    if (isDevelopment) {
      developmentLogger.info(`API GET request to ${url} was started...`);
    }

    const response = yield call(fetch, url);
    status = response.status;

    const results = yield call([response, response.json]);

    if (status !== 200) {
      if (isDevelopment) {
        developmentLogger.warn({
          message: `Current status code is: ${status}`,
        });
      }

      if (isProduction) {
        productionLogger.warn({
          url,
          method: "GET",
          status,
          message: `API Error`,
        });
      }
    }

    yield put(catsActions.fillCats(results));
  } catch (error) {
    if (isDevelopment) {
      developmentLogger.warn({
        message: `Current status code is: ${status}`,
      });
    }

    if (isProduction) {
      productionLogger.warn({
        url,
        method: "GET",
        status,
        message: `API Error`,
      });
    }
  } finally {
    if (isDevelopment) {
      developmentLogger.info(
        `API GET request to ${url} was finished with status ${status}`
      );
    }

    if (isProduction && isBrowser) {
      handleRestPostRequest({ url, status });
    }
  }
}
