import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";

import InfoItem from "@components/InfoItem";

const News = () => {
  const { t } = useTranslation();

  const { news } = useSelector((state) => state);

  const newsItemsJSX = news.map((item) => (
    <li key={item.id}>
      <InfoItem item={item} />
    </li>
  ));

  return (
    <section>
      <h2>{t("dashboard:news")}</h2>

      <ul>{newsItemsJSX}</ul>
    </section>
  );
};

export default News;
