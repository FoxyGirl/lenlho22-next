import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import InfoItem from "@components/InfoItem";

const Article = () => {
  const router = useRouter();
  const { article } = router.query;
  const { news } = useSelector((state) => state);
  const articleItem = news.find(({ id }) => id === article);

  return (
    <section>
      <h2>Article</h2>
      {articleItem && <InfoItem item={articleItem} />}
    </section>
  );
};

export default Article;
