import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";

import { useResetType } from "@hooks/useResetType";
import { PAGE_STYLES } from "@helpers/constants";

import Menu from "@components/Menu";
import User from "@components/User";

export const getServerSideProps = async (context) => {
  const { stateUpdates } = await initialDispatcher(context, initializeStore());

  return {
    props: {
      initialReduxState: stateUpdates,
    },
  };
};

const UserPage = () => {
  useResetType();

  return (
    <div style={PAGE_STYLES}>
      <Menu />
      <User />
    </div>
  );
};
export default UserPage;
