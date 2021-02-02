import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import InfoItem from "@components/InfoItem";

const Article = () => {
  const router = useRouter();
  const { article } = router.query;
  const { news } = useSelector((state) => state);
  const articleItem = news.find(({ id }) => id === article);

  return (
    <section>{articleItem ? <InfoItem item={articleItem} /> : null}</section>
  );
};

export default Article;
