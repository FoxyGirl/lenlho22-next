import * as R from "ramda";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";
import { discountsActions } from "@bus/discounts/actions";
import { selectDiscounts, selectUserType } from "@bus/selectors";

import { getDiscounts } from "@helpers/dataUtils";
import { serverDispatch } from "@helpers/serverDispatch";
import { isAllowedRoute } from "@hooks/statusRedirectHooks";
import { useResetType } from "@hooks/useResetType";

import Layout from "@components/Layout";
import Discounts from "@components/Discounts";
import BackLink from "@components/BackLink";

export const getServerSideProps = async (context) => {
  const { locale } = context;

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
      ...(await serverSideTranslations(locale, ["common", "dashboard"])),
    },
  };
};

const DiscountsPage = () => {
  useResetType();

  return (
    <Layout title="Discounts">
      <BackLink />
      <Discounts />
    </Layout>
  );
};
export default DiscountsPage;
