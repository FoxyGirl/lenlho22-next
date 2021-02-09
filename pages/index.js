import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";

import { PAGE_STYLES } from "@helpers/constants";
// import { useSetUserStatus } from "@hooks/synchronizeHooks";

import Message from "@components/Message";
import Menu from "@components/Menu";

export const getServerSideProps = async (context) => {
  const store = await initialDispatcher(context, initializeStore());

  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    },
  };
};

const HomePage = () => {
  // useSetUserStatus();

  return (
    <div style={PAGE_STYLES}>
      <Menu />
      <Message />
    </div>
  );
};
export default HomePage;
