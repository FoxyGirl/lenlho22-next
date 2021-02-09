import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";

import { PAGE_STYLES } from "@helpers/constants";
import { useResetType } from "@hooks/useResetType";

import Message from "@components/Message";
import Menu from "@components/Menu";

export const getServerSideProps = async (context) => {
  const { stateUpdates } = await initialDispatcher(context, initializeStore());

  return {
    props: {
      initialReduxState: stateUpdates,
    },
  };
};

const HomePage = () => {
  useResetType();

  return (
    <div style={PAGE_STYLES}>
      <Menu />
      <Message />
    </div>
  );
};
export default HomePage;
