import { useEffect } from "react";
import { destroyCookie } from "nookies";

export const useResetType = () => {
  useEffect(() => {
    const unloadCallback = () => {
      // Destroy cookie
      destroyCookie(null, "magicType");
    };

    window.addEventListener("beforeunload", unloadCallback);

    return () => {
      window.removeEventListener("unlbeforeunloadoad", unloadCallback);
    };
  }, []);
};
