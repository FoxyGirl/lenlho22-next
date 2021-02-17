// Other
import { developmentLogger } from "./logger";

export const serverReduxLogger = (store) => (next) => (action) => {
  developmentLogger.info(
    `Redux Dispatch: ${action.type}
    with payload ${action.payload}`
  );

  next(action);
};
