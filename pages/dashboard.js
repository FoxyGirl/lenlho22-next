import Link from "next/link";
import { useSelector } from "react-redux";

import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";
import { newsActions } from "@bus/news/actions";
import { discountsActions } from "@bus/discounts/actions";
import { carsActions } from "@bus/cars/actions";
import {
  selectNews,
  selectDiscounts,
  selectCars,
  selectUser,
} from "@bus/selectors";

import { PAGE_STYLES } from "@helpers/constants";
import { getDataFromFile } from "@helpers/dataUtils";
// import {
//   useSynchronizeNews,
//   useSynchronizeDiscounts,
//   useSynchronizeCars,
// } from "@hooks/synchronizeHooks";
// import { useSetUserStatus } from "@hooks/synchronizeHooks";

import Menu from "@components/Menu";

import styles from "@styles/Dashboard.module.css";

export const getServerSideProps = async (context) => {
  const store = await initialDispatcher(context, initializeStore());

  const getNews = getDataFromFile("news.json");
  const getDiscounts = getDataFromFile("discounts.json");
  const getCars = getDataFromFile("cars.json");

  const news = await getNews();
  const discounts = await getDiscounts();
  const cars = await getCars();

  store.dispatch(newsActions.fillNews(news));
  store.dispatch(discountsActions.fillDiscounts(discounts));
  store.dispatch(carsActions.fillCars(cars));

  const updatedState = store.getState();

  // console.log("getServerSideProps updatedState", updatedState);

  // const initialReduxState = store.getState();
  const initialReduxState = {
    news: selectNews(updatedState),
    discounts: selectDiscounts(updatedState),
    cars: selectCars(updatedState),
    // user: selectUser(updatedState),
  };

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

const DashboardPage = ({ initialReduxState }) => {
  // useSynchronizeNews(initialReduxState);
  // useSynchronizeDiscounts(initialReduxState);
  // useSynchronizeCars(initialReduxState);
  // useSetUserStatus();

  const news = useSelector(selectNews);
  const discounts = useSelector(selectDiscounts);
  const cars = useSelector(selectCars);
  const user = useSelector(selectUser);

  console.log("DashboardPage user = ", user);

  const mapSubmenu = {
    news,
    discounts,
    cars,
  };

  const renderSubmenuJSX = (menuId) =>
    mapSubmenu[menuId].length > 0 ? (
      <ul>
        {mapSubmenu[menuId].map(({ id, content }) => (
          <li key={id}>
            <Link href={`/${menuId}/${encodeURIComponent(id)}`}>
              <a>{`${content.slice(0, 25)}...`}</a>
            </Link>
          </li>
        ))}
      </ul>
    ) : null;

  const asideMenuItemsJSX = dashboardMenu.map(({ id: menuId, href, name }) => (
    <li key={menuId}>
      <Link href={href}>
        <a>{name}</a>
      </Link>
      {renderSubmenuJSX(menuId)}
    </li>
  ));

  return (
    <div style={PAGE_STYLES}>
      <Menu />
      <div className={styles.container}>
        <ul className={styles.wrap}>{asideMenuItemsJSX}</ul>
      </div>
    </div>
  );
};
export default DashboardPage;
