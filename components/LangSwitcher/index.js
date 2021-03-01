import nextI18NextConfig from "@init/next-i18next.config";
import { useRouter } from "next/router";

import styles from "./LangSwitcher.module.scss";

const LangSwitcher = () => {
  const { locale } = useRouter();

  const {
    i18n: { locales },
  } = nextI18NextConfig;

  const alternativeLangs = locales.filter((lang) => lang !== locale);

  const changeLocale = (lang) => () => {
    const currentHref = window.location.href;

    if (currentHref.includes(locale)) {
      window.location.href = currentHref.replace(locale, lang);
    } else {
      const host = window.location.host;
      window.location.href = currentHref.replace(host, `${host}/${lang}`);
    }
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
