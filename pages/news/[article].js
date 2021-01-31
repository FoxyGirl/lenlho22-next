import { initializeStore } from "@init/store";
import { initilDispatcher } from "@init/initilDispatcher";
import { setUserInState } from "@init/utils";
import { newsActions } from "@bus/news/actions";

import { getUser } from "@helpers/userUtils";
import { getDataFromFile } from "@helpers/dataUtils";

import Menu from "@components/Menu";
import Article from "@components/Article";
import BackLink from "@components/BackLink";

export const getServerSideProps = async (context) => {
  const user = await getUser(context);
  const store = await initilDispatcher(context, initializeStore());
  setUserInState(store, user);

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

const ArticlePage = () => {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <Menu />
      <p>
        <BackLink />
      </p>
      <h1>Article</h1>
      <Article />
    </div>
  );
};
export default ArticlePage;
