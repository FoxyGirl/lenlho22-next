import { initializeStore } from "@init/store";
import { initilDispatcher } from "@init/initilDispatcher";
import { newsActions } from "@bus/news/actions";

import { getDataFromFile } from "@helpers/dataUtils";

import Menu from "@components/Menu";
import News from "@components/News";
import BackLink from "@components/BackLink";

export const getServerSideProps = async (context) => {
  const store = await initilDispatcher(context, initializeStore());

  const getNews = getDataFromFile("news.json");
  const news = await getNews();

  store.dispatch(newsActions.fillNews(news));
  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    },
  };
};

const NewsPage = () => {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <Menu />
      <p>
        <BackLink />
      </p>
      <News />
    </div>
  );
};
export default NewsPage;