import { useEffect, useState } from "react";
import Loader from "@components/Loader";

const ScriptsLoader = () => {
  const [isScriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!isScriptLoaded) {
      setScriptLoaded(true);
    }
  }, []);

  return isScriptLoaded ? null : <Loader text="Scripts loading" />;
};

export default ScriptsLoader;
