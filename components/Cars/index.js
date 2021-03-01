import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";

import InfoItem from "@components/InfoItem";

const Cars = () => {
  const { t } = useTranslation();

  const { cars } = useSelector((state) => state);

  return (
    <section>
      <h2>{t("dashboard:cars")}</h2>

      <ul>
        {cars.map((item) => (
          <li key={item.id}>
            <InfoItem item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Cars;
