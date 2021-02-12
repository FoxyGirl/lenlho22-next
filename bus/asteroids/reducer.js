import { types } from "./types";

const initialState = [];

export const asteroidsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FILL_ASTEROIDS:
      return [...state, ...payload];
    default:
      return state;
  }
};
