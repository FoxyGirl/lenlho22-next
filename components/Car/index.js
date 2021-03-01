import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";

import InfoItem from "@components/InfoItem";

const Car = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const { car } = router.query;
  const { cars } = useSelector((state) => state);
  const carItem = cars.find(({ id }) => id === car);

  return (
    <section>
      <h1>{t("dashboard:car")}</h1>
      {carItem ? <InfoItem item={carItem} /> : null}
    </section>
  );
};

export default Car;
