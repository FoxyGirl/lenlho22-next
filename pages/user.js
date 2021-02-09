import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";
// import { useSynchronizeVisitCounts } from "@hooks/synchronizeHooks";
// import { useSetUserStatus } from "@hooks/synchronizeHooks";

import { selectUser, selectUserVisitCounts } from "@bus/selectors";

import { PAGE_STYLES } from "@helpers/constants";

import Menu from "@components/Menu";
import User from "@components/User";

export const getServerSideProps = async (context) => {
  const store = await initialDispatcher(context, initializeStore());

  // const initialReduxState = store.getState();
  const updatedState = store.getState();
  const views = selectUserVisitCounts(updatedState);
  console.log("!!! views", views);

  const initialReduxState = {
    user: selectUser(updatedState),
    // user: {
    //   visitCounts: selectUserVisitCounts(updatedState),
    //   // userId: selectUserId(updatedState),
    // },
  };

  return {
    props: {
      initialReduxState,
    },
  };
};

const UserPage = ({ initialReduxState }) => {
  // useSynchronizeVisitCounts(initialReduxState);
  // useSetUserStatus();

  return (
    <div style={PAGE_STYLES}>
      <Menu />
      <User />
    </div>
  );
};
export default UserPage;
