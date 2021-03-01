import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";

import { useResetType } from "@hooks/useResetType";

import Layout from "@components/Layout";
import User from "@components/User";

export const getServerSideProps = async (context) => {
  const { locale } = context;

  const { stateUpdates } = await initialDispatcher(context, initializeStore());

  return {
    props: {
      initialReduxState: stateUpdates,
      ...(await serverSideTranslations(locale, ["common", "user"])),
    },
  };
};

const UserPage = () => {
  useResetType();

  return (
    <Layout title="User">
      <User />
    </Layout>
  );
};

export default UserPage;
