import { useSelector } from "react-redux";

import { initializeStore } from "@init/store";
import { initilDispatcher } from "@init/initilDispatcher";
import { setUserInState } from "@init/utils";
import { newsActions } from "@bus/news/actions";

import { getUser } from "@helpers/userUtils";
import { getDataFromFile } from "@helpers/dataUtils";

import Menu from "@components/Menu";
import News from "@components/News";

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

const NewsPage = () => {
  const { news } = useSelector((state) => state);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <Menu />
      {news.length > 0 && <News news={news} />}
    </div>
  );
};
export default NewsPage;