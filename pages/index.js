import { initializeStore } from "@init/store";
import { initilDispatcher } from "@init/initilDispatcher";

import { PAGE_STYLES } from "@helpers/constants";

import Message from "@components/Message";
import Menu from "@components/Menu";

export const getServerSideProps = async (context) => {
  const store = await initilDispatcher(context, initializeStore());

  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    },
  };
};

const HomePage = () => {
  return (
    <div style={PAGE_STYLES}>
      <Menu />
      <Message />
    </div>
  );
};
export default HomePage;
