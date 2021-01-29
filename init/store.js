// Core
import { useMemo } from "react";
import { createStore } from "redux";

// Middleware
import createSagaMiddleware from "redux-saga";

// Instruments
import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";

import { bindMiddleware } from "./bindMiddleware";

let store;

export const initStore = (preloadedState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const initedStore = createStore(
    rootReducer,
    preloadedState,
    bindMiddleware([sagaMiddleware])
  );

  initedStore.sagaTask = sagaMiddleware.run(rootSaga);

  return initedStore;
};

export const initializeStore = (preloadedState = {}) => {
  let initializedStore = store || initStore(preloadedState);

  if (preloadedState && store) {
    initializedStore = initStore({
      ...preloadedState,
      ...store.getState(),
    });

    store = undefined;
  }

  if (typeof window === "undefined") {
    return initializedStore;
  }

  if (!store) {
    store = initializedStore;
  }

  return initializedStore;
};

export const useStore = (initialState = {}) => {
  return useMemo(() => initializeStore(initialState), [initialState]);
};
