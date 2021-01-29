import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

export const bindMiddleware = (middleware) => {
  if (process.env.NODE_DEV === "development" && typeof window !== "undefined") {
    middleware.push(
      createLogger({
        duration: true,
        timestamp: true,
        collapsed: true,
        diff: true,
      })
    );
  }

  return composeWithDevTools(applyMiddleware(...middleware));
};
