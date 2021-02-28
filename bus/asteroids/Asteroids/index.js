import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";

import { selectAsteroids } from "@bus/selectors";

import styles from "./Asteroids.module.scss";

const Asteroids = () => {
  const { t } = useTranslation();

  const asteroids = useSelector(selectAsteroids);

  const asteroidsJSX = asteroids.map(({ id, full_name }) => (
    <li key={id}>{full_name}</li>
  ));

  return (
    <section>
      <h1>{t("home:asteroids")}</h1>
      <ul className={styles.wrap}>{asteroidsJSX}</ul>
    </section>
  );
};

export default Asteroids;
