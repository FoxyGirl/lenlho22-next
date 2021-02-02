import { initializeStore } from "@init/store";
import { initilDispatcher } from "@init/initilDispatcher";
import { carsActions } from "@bus/cars/actions";

import { getDataFromFile } from "@helpers/dataUtils";

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
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <Menu />
      <p>
        <BackLink />
      </p>
      <Cars />
    </div>
  );
};
export default CarsPage;
