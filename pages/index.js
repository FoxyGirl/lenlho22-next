import * as R from "ramda";

import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";
import { initApollo } from "@init/initApollo";
import queryPokemons from "../bus/pokemons/hooks/usePokemons/gql/queryPokemons.graphql";

import { asteroidsActions } from "@bus/asteroids/actions";
import { selectAsteroids } from "@bus/selectors";

import { PAGE_STYLES } from "@helpers/constants";
import { useResetType } from "@hooks/useResetType";
import { serverDispatch } from "@helpers/serverDispatch";
import { disableSaga } from "@helpers/disableSaga";

import Asteroids from "@bus/asteroids/Asteroids";
import Message from "@components/Message";
import Menu from "@components/Menu";
import Pokemons from "@bus/pokemons/Pokemons";

export const getServerSideProps = async (context) => {
  const { store, stateUpdates } = await initialDispatcher(
    context,
    initializeStore()
  );

  const initialApolloState = await initApollo(context, async (execute) => {
    await execute({
      query: queryPokemons,
    });
  });

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
      initialApolloState,
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
      <hr />
      <Pokemons />
    </div>
  );
};
export default HomePage;
