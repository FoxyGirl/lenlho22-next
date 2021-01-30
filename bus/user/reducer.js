import { types } from "./types";
import { getUserStatus } from "../../helpers/utils";

const initialState = {
  userId: null,
  userType: null,
  visitCounts: 0,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FILL_USER:
      return { ...state, userId: payload };
    case types.SET_VISIT_COUNTS:
      return { ...state, visitCounts: payload };
    case types.SET_USER_TYPE:
      return { ...state, userType: getUserStatus(payload) };
    default:
      return state;
  }
};
