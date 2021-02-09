import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";
import { carsActions } from "@bus/cars/actions";
import { selectCars } from "@bus/selectors";

import { getDataFromFile } from "@helpers/dataUtils";
import { PAGE_STYLES } from "@helpers/constants";
import { useStatusRedirect } from "@hooks/statusRedirectHooks";
// import { useSetUserStatus } from "@hooks/synchronizeHooks";

import Menu from "@components/Menu";
import Car from "@components/Car";
import BackLink from "@components/BackLink";

export const getServerSideProps = async (context) => {
  const store = await initialDispatcher(context, initializeStore());
  const cars = await getDataFromFile("cars.json")();

  const {
    query: { car },
  } = context;

  const curentItem = cars.find(({ id }) => id === car);

  if (!curentItem) {
    return {
      redirect: {
        destination: "/404",
      },
    };
  }

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

const CarPage = () => {
  // useSetUserStatus();
  useStatusRedirect();

  return (
    <div style={PAGE_STYLES}>
      <Menu />
      <BackLink />
      <h1>Car</h1>
      <Car />
    </div>
  );
};
export default CarPage;
