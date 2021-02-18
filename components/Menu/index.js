import ActiveLink from "@components/ActiveLink";
import styles from "./Menu.module.scss";

const menu = [
  {
    id: 1,
    href: "/",
    name: "Home",
  },
  {
    id: 2,
    href: "/dashboard",
    name: "Dashboard",
  },
  {
    id: 3,
    href: "/user",
    name: "User",
  },
];

const Menu = () => {
  const menuItemsJSX = menu.map(({ id, href, name }) => (
    <li key={id}>
      <ActiveLink href={href}>{name}</ActiveLink>
    </li>
  ));

  return (
    <div className={styles.container}>
      <ul className={styles.wrap}>{menuItemsJSX}</ul>
    </div>
  );
};

export default Menu;
