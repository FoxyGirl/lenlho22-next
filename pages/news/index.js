import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";
import { newsActions } from "@bus/news/actions";
import { selectNews } from "@bus/selectors";

import { getDataFromFile } from "@helpers/dataUtils";
// import { useSetUserStatus } from "@hooks/synchronizeHooks";
import { PAGE_STYLES } from "@helpers/constants";

import Menu from "@components/Menu";
import News from "@components/News";
import BackLink from "@components/BackLink";

export const getServerSideProps = async (context) => {
  const store = await initialDispatcher(context, initializeStore());

  const getNews = getDataFromFile("news.json");
  const news = await getNews();

  store.dispatch(newsActions.fillNews(news));
  // const initialReduxState = store.getState();
  const updatedState = store.getState();

  const initialReduxState = {
    news: selectNews(updatedState),
  };

  return {
    props: {
      initialReduxState,
    },
  };
};

const NewsPage = () => {
  // useSetUserStatus();

  return (
    <div style={PAGE_STYLES}>
      <Menu />
      <BackLink />
      <News />
    </div>
  );
};
export default NewsPage;
