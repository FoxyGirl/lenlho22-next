import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import styles from "./BackLink.module.scss";

const BackLink = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleClick = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <p>
      <a className={styles.link} onClick={handleClick}>
        {t("dashboard:back")}
      </a>
    </p>
  );
};

export default BackLink;
