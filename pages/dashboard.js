import { useSelector } from "react-redux";

import { initializeStore } from "@init/store";
import { initilDispatcher } from "@init/initilDispatcher";
import { setUserInState } from "@init/utils";

import { USER_STATUS } from "@helpers/constants";
import { getUser } from "@helpers/userUtils";
import { getDataFromFile } from "@helpers/dataUtils";

import Menu from "@components/Menu";
import News from "@components/News";
import Discounts from "@components/Discounts";
import Cars from "@components/Cars";

export const getServerSideProps = async (context) => {
  const user = await getUser(context);
  const store = await initilDispatcher(context, initializeStore());
  setUserInState(store, user);

  const initialReduxState = store.getState();

  const getNews = getDataFromFile("news.json");
  const getDiscounts = getDataFromFile("discounts.json");
  const getCars = getDataFromFile("cars.json");

  const news = await getNews();
  const discounts = await getDiscounts();
  const cars = await getCars();

  return {
    props: {
      news,
      discounts,
      cars,
      initialReduxState,
    },
  };
};

const Dashboard = ({ news, discounts, cars }) => {
  const { userType } = useSelector((state) => state.user);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <Menu />
      {news.length > 0 && <News news={news} />}
      {discounts.length > 0 &&
        (userType === USER_STATUS.FRIEND ||
          userType === USER_STATUS.FAMILY) && (
          <Discounts discounts={discounts} />
        )}
      {cars.length > 0 && userType === USER_STATUS.FAMILY && (
        <Cars cars={cars} />
      )}
    </div>
  );
};
export default Dashboard;
