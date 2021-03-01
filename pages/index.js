import * as R from "ramda";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";
import { initApollo } from "@init/initApollo";
import queryPokemons from "../bus/pokemons/hooks/usePokemons/gql/queryPokemons.graphql";

import { asteroidsActions } from "@bus/asteroids/actions";
import { selectAsteroids } from "@bus/selectors";
import { catsActions } from "@bus/cats/actions";

import { useResetType } from "@hooks/useResetType";
import { serverDispatch } from "@helpers/serverDispatch";
import { disableSaga } from "@helpers/disableSaga";

import Layout from "@components/Layout";
import Asteroids from "@bus/asteroids/Asteroids";
import { Cats } from "@bus/cats/catsComponent";
import Message from "@components/Message";
import Pokemons from "@bus/pokemons/Pokemons";

export const getServerSideProps = async (context) => {
  const { locale } = context;

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
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  };
};

const HomePage = () => {
  useResetType();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(catsActions.loadCatsAsync());
  }, []);

  return (
    <Layout title={t("common:home")}>
      <Message />
      <Cats />
      <hr />
      <Asteroids />
      <hr />
      <Pokemons />
    </Layout>
  );
};
export default HomePage;
