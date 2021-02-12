// Hooks
import { usePokemons } from "@bus/pokemons/hooks/usePokemons";

const Pokemons = () => {
  const { pokemons } = usePokemons();

  const pokemonsJSX =
    pokemons && pokemons.map(({ id, name }) => <li key={id}>{name}</li>);

  return (
    <section>
      <h1>Pokemons</h1>
      <ul>{pokemonsJSX}</ul>
    </section>
  );
};

export default Pokemons;
