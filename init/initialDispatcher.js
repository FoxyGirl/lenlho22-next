import { setUser, setMagicType } from "@helpers/userUtils";

import { userActions } from "@bus/user/actions";
import {
  selectUserId,
  selectUserType,
  selectUserVisitCounts,
} from "@bus/selectors";

import { serverDispatch } from "@helpers/serverDispatch";

export const initialDispatcher = async (context, store) => {
  // set user that is required for all pages
  const user = await setUser(context);
  const userType = await setMagicType(context, user);

  await serverDispatch(store, (dispatch) => {
    dispatch(userActions.fillUser(user.userId));
    dispatch(userActions.setVisitCounts(user.visitCounts));
    dispatch(userActions.setUserType(userType));
  });

  const state = store.getState();

  const stateUpdates = {
    user: {
      userId: selectUserId(state),
      userType: selectUserType(state),
      visitCounts: selectUserVisitCounts(state),
    },
  };

  return {
    store,
    stateUpdates,
  };
};
