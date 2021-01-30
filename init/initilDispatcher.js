import { profileActions } from "../bus/profile/actions";

export const initilDispatcher = async (context, store) => {
  // store.dispatch(); on the server base actions that are common for all pages
  // e.g. autorization, user.status, country, user device etc.
  store.dispatch(profileActions.fillProfile({ firstName: "Default 22" }));

  return store;
};
