import { userActions } from "@bus/user/actions";
import { getUserStatus } from "@helpers/utils";

export const setUserInState = (store, user) => {
  const userStatus = getUserStatus(user.visitCounts);

  store.dispatch(userActions.fillUser(user.userId));
  store.dispatch(userActions.setVisitCounts(user.visitCounts));
  store.dispatch(userActions.setUserType(userStatus));
};
