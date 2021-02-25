import * as R from "ramda";
import Link from "next/link";
import { useSelector } from "react-redux";

import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";
import { newsActions } from "@bus/news/actions";
import { discountsActions } from "@bus/discounts/actions";
import { carsActions } from "@bus/cars/actions";
import { selectNews, selectDiscounts, selectCars } from "@bus/selectors";

import { PAGE_STYLES } from "@helpers/constants";
import { getNews, getDiscounts, getCars } from "@helpers/dataUtils";
import { serverDispatch } from "@helpers/serverDispatch";
import { useResetType } from "@hooks/useResetType";

import Layout from "@components/Layout";
import Menu from "@components/Menu";
import styles from "@styles/Dashboard.module.scss";

export const getServerSideProps = async (context) => {
  const { store, stateUpdates } = await initialDispatcher(
    context,
    initializeStore()
  );

  const news = await getNews();
  const discounts = await getDiscounts();
  const cars = await getCars();

  await serverDispatch(store, (dispatch) => {
    dispatch(newsActions.fillNews(news));
    dispatch(discountsActions.fillDiscounts(discounts));
    dispatch(carsActions.fillCars(cars));
  });

  const updatedState = store.getState();

  const currentPageReduxState = {
    news: selectNews(updatedState),
    discounts: selectDiscounts(updatedState),
    cars: selectCars(updatedState),
  };

  const initialReduxState = R.mergeDeepRight(
    stateUpdates,
    currentPageReduxState
  );

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

const DashboardPage = () => {
  useResetType();

  const news = useSelector(selectNews);
  const discounts = useSelector(selectDiscounts);
  const cars = useSelector(selectCars);

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
    <Layout title="Dashboard">
      <div style={PAGE_STYLES}>
        <Menu />
        <div className={styles.container}>
          <ul className={styles.wrap}>{asideMenuItemsJSX}</ul>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
