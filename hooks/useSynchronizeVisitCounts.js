import { useSelector, useDispatch } from "react-redux";

import { userActions } from "@bus/user/actions";

export const useSynchronizeVisitCounts = (initialReduxState) => {
  const dispatch = useDispatch();
  const { visitCounts } = useSelector((state) => state.user);

  const { visitCounts: serverVisitCounts } = initialReduxState.user;

  if (visitCounts !== serverVisitCounts) {
    dispatch(userActions.setVisitCounts(initialReduxState.user.visitCounts));
  }
};
