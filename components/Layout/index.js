import Head from "next/head";

import ScriptsLoader from "@components/ScriptsLoader";

import styles from "./Layout.module.scss";

const Layout = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <div className={styles.container}>
      <ScriptsLoader />
      {children}
    </div>
  </>
);

export default Layout;
