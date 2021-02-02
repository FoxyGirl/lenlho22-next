import { initializeStore } from "@init/store";
import { initilDispatcher } from "@init/initilDispatcher";
import { carsActions } from "@bus/cars/actions";

import { getDataFromFile } from "@helpers/dataUtils";
import { PAGE_STYLES } from "@helpers/constants";
import { useStatusRedirect } from "@hooks/statusRedirectHooks";

import Menu from "@components/Menu";
import Cars from "@components/Cars";
import BackLink from "@components/BackLink";

export const getServerSideProps = async (context) => {
  const store = await initilDispatcher(context, initializeStore());

  const cars = await getDataFromFile("cars.json")();

  store.dispatch(carsActions.fillCars(cars));
  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    },
  };
};

const CarsPage = () => {
  useStatusRedirect();

  return (
    <div style={PAGE_STYLES}>
      <Menu />
      <BackLink />
      <Cars />
    </div>
  );
};
export default CarsPage;
