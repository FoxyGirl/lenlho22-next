import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession } from "next-auth/client";

import { initializeStore } from "@init/store";
import { initialDispatcher } from "@init/initialDispatcher";

import { useResetType } from "@hooks/useResetType";

import Layout from "@components/Layout";
import User from "@components/User";
import AccessDenied from "@components/AccessDenied";

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
  const [session, loading] = useSession();

  useResetType();

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout title="User">
      <User />
    </Layout>
  );
};

export default UserPage;
