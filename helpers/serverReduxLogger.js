// Other
import { developmentLogger } from "./logger";

export const serverReduxLogger = (store) => (next) => (action) => {
  developmentLogger.info(
    `Redux Dispatch: ${action.type}
    with payload ${JSON.stringify(action.payload)}`
  );

  next(action);
};
