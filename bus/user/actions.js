import { types } from "./types";

export const userActions = {
  fillUser: (userId) => {
    return {
      type: types.FILL_USER,
      payload: userId,
    };
  },
  setVisitCounts: (counts) => {
    return {
      type: types.SET_VISIT_COUNTS,
      payload: counts,
    };
  },
  setUserType: (userType) => {
    return {
      type: types.SET_USER_TYPE,
      payload: userType,
    };
  },
};
