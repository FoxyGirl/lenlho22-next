// Core
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import { appWithTranslation } from "next-i18next";

// Other
import { useStore } from "@init/store";
import { useApollo } from "@init/apollo";
import nextI18NextConfig from "@init/next-i18next.config";

import "@styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const apolloCLient = useApollo(pageProps.initialApolloState);

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloCLient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
