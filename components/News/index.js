import InfoItem from "@components/InfoItem";
import { useSelector } from "react-redux";

const News = () => {
  const { news } = useSelector((state) => state);

  return (
    <section>
      <h2>News</h2>

      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <InfoItem item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default News;
