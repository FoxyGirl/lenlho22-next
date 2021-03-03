// Core
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import { appWithTranslation } from "next-i18next";
import { Provider as NextAuthProvider } from "next-auth/client";

// Other
import { useStore } from "@init/store";
import { useApollo } from "@init/apollo";
import nextI18NextConfig from "@init/next-i18next.config";

import "@styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const apolloCLient = useApollo(pageProps.initialApolloState);

  return (
    <NextAuthProvider
      options={{
        clientMaxAge: 0,
        keepalive: 0,
      }}
      session={pageProps.session}
    >
      <Provider store={store}>
        <ApolloProvider client={apolloCLient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
    </NextAuthProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
