import * as R from "ramda";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";
import { newsActions } from "@bus/news/actions";
import { selectNews } from "@bus/selectors";

import { getNews } from "@helpers/dataUtils";
import { serverDispatch } from "@helpers/serverDispatch";
import { useResetType } from "@hooks/useResetType";

import Layout from "@components/Layout";
import News from "@components/News";
import BackLink from "@components/BackLink";

export const getServerSideProps = async (context) => {
  const { locale } = context;

  const { store, stateUpdates } = await initialDispatcher(
    context,
    initializeStore()
  );

  const news = await getNews();

  await serverDispatch(store, (dispatch) => {
    dispatch(newsActions.fillNews(news));
  });

  const updatedState = store.getState();

  const currentPageReduxState = {
    news: selectNews(updatedState),
  };

  const initialReduxState = R.mergeDeepRight(
    stateUpdates,
    currentPageReduxState
  );

  return {
    props: {
      initialReduxState,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

const NewsPage = () => {
  useResetType();

  return (
    <Layout title="News">
      <BackLink />
      <News />
    </Layout>
  );
};
export default NewsPage;
