import nextI18NextConfig from "@init/next-i18next.config";
import { useRouter } from "next/router";

import styles from "./LangSwitcher.module.scss";

const LangSwitcher = () => {
  const { locale } = useRouter();
  // console.log("locale", locale);

  const {
    i18n: { locales },
  } = nextI18NextConfig;

  // console.log("locales", locales);

  const alternativeLangs = locales.filter((lang) => lang !== locale);

  const changeLocale = (lang) => () => {
    // console.log("changeLocale");
    window.location.href = window.location.href.replace(locale, lang);
  };

  return (
    <div className={styles.container}>
      {alternativeLangs.map((lang) => (
        <button key={lang} onClick={changeLocale(lang)}>
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LangSwitcher;
