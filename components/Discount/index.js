import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";

import InfoItem from "@components/InfoItem";

const Discount = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { discount } = router.query;
  const { discounts } = useSelector((state) => state);
  const discountItem = discounts.find(({ id }) => id === discount);

  return (
    <section>
      <h1>{t("dashboard:discount")}</h1>
      {discountItem ? <InfoItem item={discountItem} /> : null}
    </section>
  );
};

export default Discount;
