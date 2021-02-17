// Core
import { useSelector } from "react-redux";
import { useEffect } from "react";

// Actions
import { catsActions } from "./actions";

// Selectors
import { selectCatsEntries } from "./selectors";

export const Cats = () => {
  const entries = useSelector(selectCatsEntries);

  const entriesJSX =
    entries && entries.map(({ _id, text }) => <p key={_id}>{text}</p>);

  return (
    <>
      <h1>Cats</h1>
      {entriesJSX}
    </>
  );
};
