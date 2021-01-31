import { initializeStore } from "@init/store";
import { initilDispatcher } from "@init/initilDispatcher";
import { setUserInState } from "@init/utils";
import { carsActions } from "@bus/cars/actions";

import { getUser } from "@helpers/userUtils";
import { getDataFromFile } from "@helpers/dataUtils";

import Menu from "@components/Menu";
import Car from "@components/Car";
import BackLink from "@components/BackLink";

export const getServerSideProps = async (context) => {
  const user = await getUser(context);
  const store = await initilDispatcher(context, initializeStore());
  setUserInState(store, user);

  const cars = await getDataFromFile("cars.json")();

  store.dispatch(carsActions.fillCars(cars));
  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    },
  };
};

const CarPage = () => {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <Menu />
      <p>
        <BackLink />
      </p>
      <h1>Car</h1>
      <Car />
    </div>
  );
};
export default CarPage;
