import { useSelector } from "react-redux";

import { selectAsteroids } from "@bus/selectors";

import styles from "./Asteroids.module.scss";

const Asteroids = () => {
  const asteroids = useSelector(selectAsteroids);

  const asteroidsJSX = asteroids.map(({ id, full_name }) => (
    <li key={id}>{full_name}</li>
  ));

  return (
    <section>
      <h1>Asteroids</h1>
      <ul className={styles.wrap}>{asteroidsJSX}</ul>
    </section>
  );
};

export default Asteroids;
