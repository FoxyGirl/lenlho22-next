import * as R from "ramda";

import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";
import { discountsActions } from "@bus/discounts/actions";
import { selectDiscounts, selectUserType } from "@bus/selectors";

import { getDiscounts } from "@helpers/dataUtils";
import { serverDispatch } from "@helpers/serverDispatch";
import { isAllowedRoute } from "@hooks/statusRedirectHooks";
import { useResetType } from "@hooks/useResetType";

import Layout from "@components/Layout";
import Menu from "@components/Menu";
import Discounts from "@components/Discounts";
import BackLink from "@components/BackLink";

export const getServerSideProps = async (context) => {
  const { store, stateUpdates } = await initialDispatcher(
    context,
    initializeStore()
  );

  const discounts = await getDiscounts();

  await serverDispatch(store, (dispatch) => {
    dispatch(discountsActions.fillDiscounts(discounts));
  });

  const updatedState = store.getState();

  const currentPageReduxState = {
    discounts: selectDiscounts(updatedState),
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
    },
  };
};

const DiscountsPage = () => {
  useResetType();

  return (
    <Layout title="Discounts">
      <Menu />
      <BackLink />
      <Discounts />
    </Layout>
  );
};
export default DiscountsPage;
