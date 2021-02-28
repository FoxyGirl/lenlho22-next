import { useTranslation } from "next-i18next";

// Hooks
import { usePokemons } from "@bus/pokemons/hooks/usePokemons";

const Pokemons = () => {
  const { t } = useTranslation();

  const { pokemons } = usePokemons();

  const pokemonsJSX =
    pokemons && pokemons.map(({ id, name }) => <li key={id}>{name}</li>);

  return (
    <section>
      <h1>{t("home:pokemons")}</h1>
      <ul>{pokemonsJSX}</ul>
    </section>
  );
};

export default Pokemons;
