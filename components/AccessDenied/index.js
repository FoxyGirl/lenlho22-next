import { signIn } from "next-auth/client";
import { useTranslation } from "next-i18next";

const AccessDenied = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("common:access_title")}</h1>
      <p>
        <a
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          {t("common:access_text")}
        </a>
      </p>
    </>
  );
};

export default AccessDenied;
