import * as R from "ramda";

import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";
import { discountsActions } from "@bus/discounts/actions";
import { selectDiscounts } from "@bus/selectors";

import { getDiscounts } from "@helpers/dataUtils";
import { PAGE_STYLES } from "@helpers/constants";
import { serverDispatch } from "@helpers/serverDispatch";
import { useStatusRedirect } from "@hooks/statusRedirectHooks";
import { useResetType } from "@hooks/useResetType";

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

  return {
    props: {
      initialReduxState,
    },
  };
};

const DiscountsPage = () => {
  useResetType();
  useStatusRedirect();

  return (
    <div style={PAGE_STYLES}>
      <Menu />
      <BackLink />
      <Discounts />
    </div>
  );
};
export default DiscountsPage;
