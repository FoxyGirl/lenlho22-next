import { initializeStore } from "../init/store";
import { initilDispatcher } from "../init/initilDispatcher";
import { userActions } from "../bus/user/actions";

import { setUser } from "../helpers/userUtils";

import Message from "../components/Message";
import Menu from "../components/Menu";

export const getServerSideProps = async (context) => {
  const user = await setUser(context);
  const store = await initilDispatcher(context, initializeStore());
  store.dispatch(userActions.fillUser(user.userId));
  store.dispatch(userActions.setVisitCounts(user.visitCounts));
  store.dispatch(userActions.setUserType(user.visitCounts));

  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    },
  };
};

const Home = () => {
  return (
    <>
      <Menu />
      <Message />
    </>
  );
};
export default Home;
