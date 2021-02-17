import { useSelector } from "react-redux";

import { selectAsteroids } from "@bus/selectors";

const Asteroids = () => {
  const asteroids = useSelector(selectAsteroids);

  const asteroidsJSX = asteroids.map(({ id, full_name }) => (
    <li key={id}>{full_name}</li>
  ));

  return (
    <section>
      <h1>Asteroids</h1>
      <ul>{asteroidsJSX}</ul>
    </section>
  );
};

export default Asteroids;
