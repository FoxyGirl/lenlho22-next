import Head from "next/head";

const Layout = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
  </>
);

export default Layout;
