import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";
import { newsActions } from "@bus/news/actions";

import { getDataFromFile } from "@helpers/dataUtils";
// import { useSetUserStatus } from "@hooks/synchronizeHooks";
import { PAGE_STYLES } from "@helpers/constants";

import Menu from "@components/Menu";
import Article from "@components/Article";
import BackLink from "@components/BackLink";

export const getServerSideProps = async (context) => {
  const store = await initialDispatcher(context, initializeStore());

  const getNews = getDataFromFile("news.json");
  const news = await getNews();

  const {
    query: { article },
  } = context;

  const curentItem = news.find(({ id }) => id === article);

  if (!curentItem) {
    return {
      redirect: {
        destination: "/404",
      },
    };
  }

  store.dispatch(newsActions.fillNews(news));
  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    },
  };
};

const ArticlePage = () => {
  // useSetUserStatus();

  return (
    <div style={PAGE_STYLES}>
      <Menu />
      <BackLink />
      <h1>Article</h1>
      <Article />
    </div>
  );
};
export default ArticlePage;
