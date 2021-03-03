import Head from "next/head";

import Menu from "@components/Menu";
import ScriptsLoader from "@components/ScriptsLoader";
import LangSwitcher from "@components/LangSwitcher";
import Header from "@components/Header";

import styles from "./Layout.module.scss";

const Layout = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <div className={styles.container}>
      <Header />
      <Menu />
      <ScriptsLoader />
      <LangSwitcher />
      {children}
    </div>
  </>
);

export default Layout;
