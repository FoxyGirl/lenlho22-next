import * as R from "ramda";
import Link from "next/link";
import { useSelector } from "react-redux";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useSession } from "next-auth/client";
import AccessDenied from "@components/AccessDenied";

import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";
import { newsActions } from "@bus/news/actions";
import { discountsActions } from "@bus/discounts/actions";
import { carsActions } from "@bus/cars/actions";
import { selectNews, selectDiscounts, selectCars } from "@bus/selectors";

import { getNews, getDiscounts, getCars } from "@helpers/dataUtils";
import { serverDispatch } from "@helpers/serverDispatch";
import { useResetType } from "@hooks/useResetType";

import Layout from "@components/Layout";
import styles from "@styles/Dashboard.module.scss";

export const getServerSideProps = async (context) => {
  const { locale } = context;

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
      ...(await serverSideTranslations(locale, ["common", "dashboard"])),
    },
  };
};

const dashboardMenu = [
  {
    id: "news",
    href: "/news",
    name: "news",
  },
  {
    id: "discounts",
    href: "/discounts",
    name: "discounts",
  },
  {
    id: "cars",
    href: "/cars",
    name: "cars",
  },
];

const DashboardPage = () => {
  useResetType();
  const [session, loading] = useSession();
  const { t } = useTranslation();

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
        <a>{t(`dashboard:${name}`)}</a>
      </Link>
      {renderSubmenuJSX(menuId)}
    </li>
  ));

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">
      <div className={styles.container}>
        <ul className={styles.wrap}>{asideMenuItemsJSX}</ul>
      </div>
    </Layout>
  );
};

export default DashboardPage;
