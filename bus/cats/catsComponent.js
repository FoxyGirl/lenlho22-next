// Core
import { useSelector } from "react-redux";
import { useTranslation } from "next-i18next";

// Selectors
import { selectCatsEntries } from "./selectors";

export const Cats = () => {
  const { t } = useTranslation();

  const entries = useSelector(selectCatsEntries);

  const entriesJSX =
    entries && entries.map(({ _id, text }) => <p key={_id}>{text}</p>);

  return (
    <>
      <h1>{t("home:cats")}</h1>
      {entriesJSX}
    </>
  );
};
