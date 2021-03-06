import * as R from "ramda";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";
import { carsActions } from "@bus/cars/actions";
import { selectCars, selectUserType } from "@bus/selectors";

import { getCars } from "@helpers/dataUtils";
import { serverDispatch } from "@helpers/serverDispatch";
import { isAllowedRoute } from "@hooks/statusRedirectHooks";
import { useResetType } from "@hooks/useResetType";

import Layout from "@components/Layout";
import Cars from "@components/Cars";
import BackLink from "@components/BackLink";

export const getServerSideProps = async (context) => {
  const { locale } = context;

  const { store, stateUpdates } = await initialDispatcher(
    context,
    initializeStore()
  );

  const cars = await getCars();

  await serverDispatch(store, (dispatch) => {
    dispatch(carsActions.fillCars(cars));
  });

  const updatedState = store.getState();

  const currentPageReduxState = {
    cars: selectCars(updatedState),
  };

  const initialReduxState = R.mergeDeepRight(
    stateUpdates,
    currentPageReduxState
  );

  // Redirect
  const userType = selectUserType(initialReduxState);
  const { resolvedUrl } = context;

  const pathname = resolvedUrl.split("/")[1];

  if (!isAllowedRoute(`/${pathname}`, userType)) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      initialReduxState,
      ...(await serverSideTranslations(locale, ["common", "dashboard"])),
    },
  };
};

const CarsPage = () => {
  useResetType();

  return (
    <Layout title="Cars">
      <BackLink />
      <Cars />
    </Layout>
  );
};
export default CarsPage;
