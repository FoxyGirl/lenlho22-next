// Core
import { Provider } from "react-redux";

// Other
import { useStore } from "../init/store";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  console.log("APP render");

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
