import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { verifyBrowser } from "@helpers/verifyBrowser";
import { verifyEnvironment } from "@helpers/verifyEnvironment";
import { serverReduxLogger } from "@helpers/serverReduxLogger";

export const bindMiddleware = (middleware) => {
  const { isDevelopment } = verifyEnvironment();
  const isBrowser = verifyBrowser();

  if (isDevelopment) {
    if (isBrowser) {
      middleware.push(
        createLogger({
          duration: true,
          timestamp: true,
          collapsed: true,
          diff: true,
        })
      );
    } else {
      middleware.push(serverReduxLogger);
    }
  }

  return composeWithDevTools(applyMiddleware(...middleware));
};
