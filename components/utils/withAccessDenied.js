import React from "react";
import { useSession } from "next-auth/client";
import AccessDenied from "@components/AccessDenied";
import Layout from "@components/Layout";

const withAccessDenied = (Component) => () => {
  const [session, loading] = useSession();

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return <Component />;
};

export default withAccessDenied;
