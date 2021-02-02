// import { profileActions } from "@bus/profile/actions";
import { setUser } from "@helpers/userUtils";
import { setUserInState } from "@init/utils";

export const initilDispatcher = async (context, store) => {
  // store.dispatch(); on the server base actions that are common for all pages
  // e.g. autorization, user.status, country, user device etc.
  // store.dispatch(profileActions.fillProfile({ firstName: "Default 22" })); // example

  const user = await setUser(context);
  setUserInState(store, user);

  console.log("First initilDispatcher user", store.getState().user);

  return store;
};
