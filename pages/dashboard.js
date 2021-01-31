import Link from "next/link";
import { useSelector } from "react-redux";

import { initializeStore } from "@init/store";
import { initilDispatcher } from "@init/initilDispatcher";
import { setUserInState } from "@init/utils";
import { newsActions } from "@bus/news/actions";
import { discountsActions } from "@bus/discounts/actions";
import { carsActions } from "@bus/cars/actions";

import { USER_STATUS } from "@helpers/constants";
import { getUser } from "@helpers/userUtils";
import { getDataFromFile } from "@helpers/dataUtils";

import Menu from "@components/Menu";
import News from "@components/News";
import Discounts from "@components/Discounts";
import Cars from "@components/Cars";

import styles from "@styles/Dashboard.module.css";

export const getServerSideProps = async (context) => {
  const user = await getUser(context);
  const store = await initilDispatcher(context, initializeStore());
  setUserInState(store, user);

  const getNews = getDataFromFile("news.json");
  const getDiscounts = getDataFromFile("discounts.json");
  const getCars = getDataFromFile("cars.json");

  const news = await getNews();
  const discounts = await getDiscounts();
  const cars = await getCars();

  store.dispatch(newsActions.fillNews(news));
  store.dispatch(discountsActions.fillDiscounts(discounts));
  store.dispatch(carsActions.fillCars(cars));

  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    },
  };
};

const dashboardMenu = [
  {
    id: "news",
    href: "/news",
    name: "News",
  },
  {
    id: "discounts",
    href: "/discounts",
    name: "Discounts",
  },
  {
    id: "cars",
    href: "/cars",
    name: "Cars",
  },
];

const Dashboard = () => {
  const { userType } = useSelector((state) => state.user);
  const { news } = useSelector((state) => state);
  const { discounts } = useSelector((state) => state);
  const { cars } = useSelector((state) => state);

  const mapSubmenu = {
    news,
    discounts,
    cars,
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <Menu />
      <div className={styles.container}>
        <ul className={styles.wrap}>
          {dashboardMenu.map(({ id, href, name }) => (
            <li key={id}>
              <Link href={href}>
                <a>{name}</a>
              </Link>
              {mapSubmenu[id].length > 0 ? (
                <ul>
                  {mapSubmenu[id].map(({ id }) => (
                    <li key={id}>
                      <p>{id}</p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
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
