import { setUser } from "@helpers/userUtils";
import { setUserInState } from "@init/utils";

export const initilDispatcher = async (context, store) => {
  // set user that is required for all pages
  const user = await setUser(context);
  setUserInState(store, user);

  return store;
};
