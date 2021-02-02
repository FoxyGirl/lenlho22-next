import { initializeStore } from "@init/store";
import { initilDispatcher } from "@init/initilDispatcher";

import Menu from "@components/Menu";
import User from "@components/User";

export const getServerSideProps = async (context) => {
  const store = await initilDispatcher(context, initializeStore());

  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    },
  };
};

const UserPAge = () => {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <Menu />
      <User />
    </div>
  );
};
export default UserPAge;
