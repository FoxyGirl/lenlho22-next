import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";

import InfoItem from "@components/InfoItem";

const Article = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const { article } = router.query;
  const { news } = useSelector((state) => state);
  const articleItem = news.find(({ id }) => id === article);

  return (
    <section>
      <h1>{t("dashboard:article")}</h1>
      {articleItem ? <InfoItem item={articleItem} /> : null}
    </section>
  );
};

export default Article;
