import { useSelector } from "react-redux";
import InfoItem from "@components/InfoItem";

const News = () => {
  const { news } = useSelector((state) => state);

  const newsItemsJSX = news.map((item) => (
    <li key={item.id}>
      <InfoItem item={item} />
    </li>
  ));

  return (
    <section>
      <h2>News</h2>

      <ul>{newsItemsJSX}</ul>
    </section>
  );
};

export default News;
