import * as R from "ramda";

import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";

import { asteroidsActions } from "@bus/asteroids/actions";
import { selectAsteroids } from "@bus/selectors";

import { PAGE_STYLES } from "@helpers/constants";
import { useResetType } from "@hooks/useResetType";
import { serverDispatch } from "@helpers/serverDispatch";
import { disableSaga } from "@helpers/disableSaga";

import Asteroids from "@components/Asteroids";
import Message from "@components/Message";
import Menu from "@components/Menu";

export const getServerSideProps = async (context) => {
  const { store, stateUpdates } = await initialDispatcher(
    context,
    initializeStore()
  );

  await serverDispatch(store, (dispatch) => {
    dispatch(asteroidsActions.loadAsteroidsAsync());
  });

  await disableSaga(store);

  const updatedState = store.getState();

  const currentPageReduxState = {
    asteroids: selectAsteroids(updatedState),
  };

  const initialReduxState = R.mergeDeepRight(
    stateUpdates,
    currentPageReduxState
  );

  return {
    props: {
      initialReduxState,
    },
  };
};

const HomePage = () => {
  useResetType();

  return (
    <div style={PAGE_STYLES}>
      <Menu />
      <Message />
      <Asteroids />
    </div>
  );
};
export default HomePage;
