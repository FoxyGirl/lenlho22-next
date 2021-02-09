import { setUser, getUser } from "@helpers/userUtils";
import { setUserInState } from "@init/utils";

export const initialDispatcher = async (context, store) => {
  // set user that is required for all pages
  const user = await setUser(context);
  // // const user = await getUser(context);

  setUserInState(store, user);

  return store;
};
