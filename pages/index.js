import { initializeStore } from "@init/store";
import { initilDispatcher } from "@init/initilDispatcher";
import { setUserInState } from "@init/utils";

import { setUser } from "@helpers/userUtils";

import Message from "@components/Message";
import Menu from "@components/Menu";

export const getServerSideProps = async (context) => {
  const user = await setUser(context);
  const store = await initilDispatcher(context, initializeStore());
  setUserInState(store, user);

  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    },
  };
};

const Home = () => {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <Menu />
      <Message />
    </div>
  );
};
export default Home;
