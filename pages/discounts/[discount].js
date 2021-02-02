import { initializeStore } from "@init/store";
import { initilDispatcher } from "@init/initilDispatcher";
import { discountsActions } from "@bus/discounts/actions";

import { getDataFromFile } from "@helpers/dataUtils";
import { PAGE_STYLES } from "@helpers/constants";
import { useStatusRedirect } from "@hooks/statusRedirectHooks";

import Menu from "@components/Menu";
import Discount from "@components/Discount";
import BackLink from "@components/BackLink";

export const getServerSideProps = async (context) => {
  const store = await initilDispatcher(context, initializeStore());
  const discounts = await getDataFromFile("discounts.json")();

  const {
    query: { discount },
  } = context;

  const curentItem = discounts.find(({ id }) => id === discount);

  if (!curentItem) {
    return {
      redirect: {
        destination: "/404",
      },
    };
  }

  store.dispatch(discountsActions.fillDiscounts(discounts));
  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    },
  };
};

const DiscountPage = () => {
  useStatusRedirect();

  return (
    <div style={PAGE_STYLES}>
      <Menu />
      <BackLink />
      <h1>Discount</h1>
      <Discount />
    </div>
  );
};
export default DiscountPage;
