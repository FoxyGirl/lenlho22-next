import { useSelector } from "react-redux";

import { initializeStore } from "../init/store";
import { initilDispatcher } from "../init/initilDispatcher";
import { userActions } from "../bus/user/actions";

import { USER_STATUS } from "../helpers/constants";
import { getUser } from "../helpers/userUtils";
import { getUserStatus } from "../helpers/utils";
import { getDataFromFile } from "../helpers/dataUtils";

import News from "../components/News";
import Discounts from "../components/Discounts";
import Cars from "../components/Cars";

export const getServerSideProps = async (context) => {
  const user = await getUser(context);
  const userStatus = getUserStatus(user.visitCounts);

  const store = await initilDispatcher(context, initializeStore());
  store.dispatch(userActions.fillUser(user.userId));
  store.dispatch(userActions.setVisitCounts(user.visitCounts));
  store.dispatch(userActions.setUserType(user.visitCounts));

  const initialReduxState = store.getState();

  let news = [];
  let discounts = [];
  let cars = [];

  const getNews = getDataFromFile("news.json");
  const getDiscounts = getDataFromFile("discounts.json");
  const getCars = getDataFromFile("cars.json");

  if (userStatus === USER_STATUS.GUEST) {
    news = await getNews();
  }

  if (userStatus === USER_STATUS.FRIEND) {
    news = await getNews();
    discounts = await getDiscounts();
  }

  if (userStatus === USER_STATUS.FAMILY) {
    news = await getNews();
    discounts = await getDiscounts();
    cars = await getCars();
  }

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
  // const { firstName, lastName } = useSelector((state) => state.profile);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      {/* <h4>First name: {firstName}</h4> */}
      {/* <h4>Last name: {lastName}</h4> */}
      {news.length > 0 && <News news={news} />}
      {discounts.length > 0 && <Discounts discounts={discounts} />}
      {cars.length > 0 && <Cars cars={cars} />}
    </div>
  );
};
export default Dashboard;
