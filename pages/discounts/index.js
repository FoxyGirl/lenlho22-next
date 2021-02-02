import { initializeStore } from "@init/store";
import { initilDispatcher } from "@init/initilDispatcher";
import { discountsActions } from "@bus/discounts/actions";

import { getDataFromFile } from "@helpers/dataUtils";
import { PAGE_STYLES } from "@helpers/constants";
import { useStatusRedirect } from "@hooks/statusRedirectHooks";

import Menu from "@components/Menu";
import Discounts from "@components/Discounts";
import BackLink from "@components/BackLink";

export const getServerSideProps = async (context) => {
  const store = await initilDispatcher(context, initializeStore());

  const discounts = await getDataFromFile("discounts.json")();

  store.dispatch(discountsActions.fillDiscounts(discounts));
  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    },
  };
};

const DiscountsPage = () => {
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
