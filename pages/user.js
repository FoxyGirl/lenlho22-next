import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";

import { useResetType } from "@hooks/useResetType";

import Layout from "@components/Layout";
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
    <Layout title="User">
      <Menu />
      <User />
    </Layout>
  );
};

export default UserPage;
