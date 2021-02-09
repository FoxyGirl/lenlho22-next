import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";
import { carsActions } from "@bus/cars/actions";

import { getDataFromFile } from "@helpers/dataUtils";
import { PAGE_STYLES } from "@helpers/constants";
import { useStatusRedirect } from "@hooks/statusRedirectHooks";
import { selectCars } from "@bus/selectors";
// import { useSetUserStatus } from "@hooks/synchronizeHooks";

import Menu from "@components/Menu";
import Cars from "@components/Cars";
import BackLink from "@components/BackLink";

export const getServerSideProps = async (context) => {
  const store = await initialDispatcher(context, initializeStore());

  const cars = await getDataFromFile("cars.json")();

  store.dispatch(carsActions.fillCars(cars));
  // const initialReduxState = store.getState();
  const updatedState = store.getState();

  const initialReduxState = {
    cars: selectCars(updatedState),
  };

  return {
    props: {
      initialReduxState,
    },
  };
};

const CarsPage = () => {
  // useSetUserStatus();
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
