import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";

import InfoItem from "@components/InfoItem";

const Discounts = () => {
  const { t } = useTranslation();

  const { discounts } = useSelector((state) => state);

  const discountsItemsJSX = discounts.map((item) => (
    <li key={item.id}>
      <InfoItem item={item} />
    </li>
  ));

  return (
    <section>
      <h2>{t("dashboard:discounts")}</h2>
      <ul>{discountsItemsJSX}</ul>
    </section>
  );
};

export default Discounts;
