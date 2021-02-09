import * as R from "ramda";

import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";
import { newsActions } from "@bus/news/actions";
import { selectNews } from "@bus/selectors";

import { getNews } from "@helpers/dataUtils";
import { PAGE_STYLES } from "@helpers/constants";
import { serverDispatch } from "@helpers/serverDispatch";
import { useResetType } from "@hooks/useResetType";

import Menu from "@components/Menu";
import News from "@components/News";
import BackLink from "@components/BackLink";

export const getServerSideProps = async (context) => {
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
    },
  };
};

const NewsPage = () => {
  useResetType();

  return (
    <div style={PAGE_STYLES}>
      <Menu />
      <BackLink />
      <News />
    </div>
  );
};
export default NewsPage;
