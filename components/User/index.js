import { useSelector, useDispatch } from "react-redux";
import { setCookie } from "nookies";
import { useTranslation } from "next-i18next";

import { userActions } from "@bus/user/actions";
import { increaseUserStatus } from "@helpers/utils";

import styles from "./User.module.scss";

const User = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { userId, userType, visitCounts } = useSelector((state) => state.user);

  const handleOnCLick = () => {
    const newUserType = increaseUserStatus(userType);
    dispatch(userActions.setUserType(newUserType));

    // Set
    setCookie(null, "magicType", newUserType, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  };

  return (
    <>
      <p className={styles.info}>
        {t("user:yourId")}: <b>{userId}</b>
      </p>
      <p className={styles.info}>
        {t("user:yourStatus")}: <b>{userType}</b>
      </p>
      <p className={styles.info}>
        {t("user:visitCounts")}: <b>{visitCounts}</b>
      </p>

      <footer className={styles.footer}>
        <button className={styles.btn} onClick={handleOnCLick}>
          {t("user:upgradeStatus")}
        </button>
      </footer>
    </>
  );
};

export default User;
