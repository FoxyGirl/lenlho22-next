import { useTranslation } from "next-i18next";

import ActiveLink from "@components/ActiveLink";
import styles from "./Menu.module.scss";

const menu = [
  {
    id: 1,
    href: "/",
    name: "home",
  },
  {
    id: 2,
    href: "/dashboard",
    name: "dashboard",
  },
  {
    id: 3,
    href: "/user",
    name: "user",
  },
];

const Menu = () => {
  const { t } = useTranslation();

  const menuItemsJSX = menu.map(({ id, href, name }) => (
    <li key={id}>
      <ActiveLink href={href}>{t(`common:${name}`)}</ActiveLink>
    </li>
  ));

  return (
    <div className={styles.container}>
      <ul className={styles.wrap}>{menuItemsJSX}</ul>
    </div>
  );
};

export default Menu;
