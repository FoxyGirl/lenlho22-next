import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Article = () => {
  const router = useRouter();
  const { article } = router.query;
  const { news } = useSelector((state) => state);
  const articleItem = news.find(({ id }) => id === article);

  return (
    <section>
      <h2>Article</h2>
      {articleItem && (
        <>
          <p>{articleItem.content}</p>
          <div style={{ color: "blue", textAlign: "right" }}>
            {articleItem.dateOfReceiving}
          </div>
        </>
      )}
    </section>
  );
};

export default Article;
