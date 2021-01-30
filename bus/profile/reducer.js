import { types } from "./types";

const initialState = {
  firstName: "Walter",
  lastName: "White",
};

export const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FILL_PROFILE:
      return { ...state, ...payload };
    default:
      return state;
  }
};
